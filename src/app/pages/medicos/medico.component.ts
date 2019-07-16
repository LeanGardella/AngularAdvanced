import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService , MedicoService} from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _ms: MedicoService , public _hs: HospitalService, public router: Router,
    public activatedRoute: ActivatedRoute,
    public _mus: ModalUploadService) {
      activatedRoute.params.subscribe(param => {
        const id = param['id'];
        if (id !== 'nuevo') {
          this.cargarMedico(id);
        }
      });
    }

  ngOnInit() {
    this._hs.cargarAllHospitales().subscribe( hosps => this.hospitales = hosps);
    this._mus.notificacion.subscribe(resp => {
      this.medico.img = resp.data.img;
    });
  }

  guardarMedico(f: NgForm) {
    if (f.valid) {
      this._ms.guardarMedico(this.medico).subscribe( m => {
        this.medico._id = m._id;
        this.router.navigate(['/medico', m._id]);
      });
    }
  }

  cambioHospital(id: string) {
    this._hs.obtenerHospital(id).subscribe((hosp: any) => this.hospital = hosp.data);
  }

  cargarMedico(id: string) {
    this._ms.cargarMedico(id).subscribe( m => {
      this.medico = m;
      this.medico.hospital = m.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto() {
    this._mus.mostrarModal('medico', this.medico._id);
  }

}
