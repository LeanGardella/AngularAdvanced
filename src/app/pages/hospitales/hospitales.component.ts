import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';



declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital [] = [];
  total = 0;
  desde = 0;
  cargando = true;
  buscando = false;

  constructor(
    public _hs: HospitalService,
    public _mu: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._mu.notificacion.subscribe(resp => {
      this.cargarHospitales();
    });
  }

  cambiarDesde(delta: number) {
  
    if ( this.desde + delta < 0 ) {
      return;
    }
    if ( this.desde + delta > this.total ) {
      return;
    }
    this.desde += delta;
    
    this.cargarHospitales();
    return;
   }

  cargarHospitales() {
    this.cargando = true;
    this.buscando = false;
    this._hs.cargarHospitales(this.desde)
      .subscribe( (resp: any) => {
        // console.log(resp);
        this.total = resp.count;
        this.hospitales = resp.data;
        this.cargando = false;
      });
  }


  buscarHospital( termino: string ) {
    if ( termino.length < 1 ) {
      this.cargarHospitales();
      return;
    }
    this.buscando = true;
    this.cargando = true;
    this._hs.buscarHospital(termino)
      .subscribe( (hs: Hospital[]) => {
        this.hospitales = hs;
        this.cargando = false;
      });
  }

  guardarHospital(hospital: Hospital ) {
    this._hs.actualizarHospital(hospital).subscribe();
  }
  borrarHospital(h: Hospital ) {
        swal({
        title: `¿Desea eliminar a ${h.nombre}?`,
        text: 'Una vez eliminado, deberá volver a registrarlo.',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      } ).then((willDelete) => {
        if (willDelete) {
          this._hs.borrarHospital(h._id)
            .subscribe(
              resp => {
                swal(`El hospital ${h.nombre} se ha eliminado.`, {
                  icon: 'success',
                });
                console.log(resp);
                this.cargarHospitales();
              }
            );
        } 
      });
      
  }

  crearHospital() { 
    swal({
        title: `Crear hospital`,
        text: 'Ingrese el nombre del hospital a crear.',
        content: 'input',
        icon: 'info',
        buttons: true,
        dangerMode: true
    }).then( (value: string) => {
      if ( !value || value.length === 0 ) {
        return;
      }
      this._hs.crearHospital(value).subscribe( () => this.cargarHospitales() );
    });

  }

  mostrarModal ( id: string) {
    this._mu.mostrarModal('hospital', id);
  }

}



