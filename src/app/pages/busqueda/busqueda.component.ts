import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[];
  medicos: Medico[];
  hospitales: Hospital[];
  buscado: string;

  constructor(public ar: ActivatedRoute, public http: HttpClient) { 
    ar.params.subscribe( params => {
      const t = params['termino'];
      this.buscar(t);
    });
  }

  ngOnInit(): void {
  }

  buscar(term: string) {
    this.http.get(URL_SERVICIOS + '/buscar/all/' + term ).subscribe( (resp: any) => {
      
      this.usuarios = resp.data.usuarios;
      this.medicos = resp.data.medicos;
      this.hospitales = resp.data.hospitales;
      this.buscado = resp.searching;
    });
  }

}
