import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde = 0;

  constructor(public _ms: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos(this.desde);
  }

  cargarMedicos(from: number) {
    this._ms.cargarMedicos(from).subscribe(
      (resp: any) => {
        this.medicos = resp;
      }
    );
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0 ) {
      this.desde = 0;
      this.cargarMedicos(this.desde);
      return;
    }
    this._ms.buscarMedico(termino).subscribe( meds => {
      this.medicos = meds;
    });
  }

  borrarMedico(medico: Medico) {
    this._ms.borrarMedico(medico).subscribe( () => this.cargarMedicos(this.desde) );
  }

  cambiarDesde(delta: number) {
  
    if ( this.desde + delta < 0 ) {
      return;
    }
    if ( this.desde + delta > this._ms.totalMedicos ) {
      return;
    }
    this.desde += delta;
    
    this.cargarMedicos(this.desde);
    return;
   }

}
