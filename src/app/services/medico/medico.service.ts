import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos = 0;

  constructor(public http: HttpClient,
    public _us: UsuarioService) { 

  }

  cargarMedicos(desde: number) {
    const url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url).pipe(map( (resp: any) => {
      this.totalMedicos = resp.count;
      return resp.data;
    }));
  }


  buscarMedico( termino: string ) { 
    // Recibe el término de búsqueda y retorna todos los medicos que coincidan con ese término de búsqueda.
  
    const url = URL_SERVICIOS + '/buscar/collection/medico/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => {
         
        return resp.data;
      }));
    
  } 
  borrarMedico (medico: Medico) {
    const url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this._us.token;
    return this.http.delete(url).pipe(map(
      resp => {
        swal('Médico borrado', 'Se eliminó el médico ' + medico.nombre, 'success');
        return resp;
      }
    ));
  }

  guardarMedico(m: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if (m._id) {
      //actualizar
      url += '/' + m._id + '?token=' + this._us.token;
      return this.http.put(url, m).pipe(map( (resp: any) => {
        swal('Médico actualizado', m.nombre, 'success');
        return resp.data;
      }));
    } else {
      //crear
      url += '?token=' + this._us.token;
      return this.http.post(url, m).pipe(map( (resp: any) => {
        swal('Médico creado', m.nombre, 'success');
        return resp.data;
      }));
    }
    
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(map( (resp: any) => {
      return resp.data;
    }));
  }
}
