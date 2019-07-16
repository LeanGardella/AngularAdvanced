import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  usuario: Usuario = null;
  token: string = null;

  constructor(public http: HttpClient) { 
    this.cargar();
  }

  cargar () {
    if (localStorage.getItem('token')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');

    } else {
      this.usuario = null;
      this.token = '';
    }
  }
 
cargarHospitales(desde: number) {// retorna un observable con todos los hospitales.
  const url = URL_SERVICIOS + '/hospital?desde=' + desde;
  return this.http.get(url);
} 
cargarAllHospitales() {// retorna un observable con todos los hospitales.
  const url = URL_SERVICIOS + '/hospital/all';
  return this.http.get(url).pipe(map( (resp: any) => {
    
    return resp.data;
  }));
} 

obtenerHospital( id: string ) { // Esta función recibe un ID de un hospital y retorna toda la información del mismo. 
  const url = URL_SERVICIOS + '/hospital/' + id;
  return this.http.get(url);

} 

borrarHospital( id: string ) {// Recibe un ID de un hospital y lo borra
  const url = `${URL_SERVICIOS}/hospital/${id}?token=${this.token}`;
  return this.http.delete(url);
} 

crearHospital( nombre: string ) { // Recibe el nombre del hospital y lo crea.
  const url = URL_SERVICIOS + '/hospital?token=' + this.token;
  const hospital = new Hospital(nombre);
    return this.http.post(url, hospital)
      .pipe(map((resp: any) => {
        
        swal('¡Enhorabuena!', `El hospital ${hospital.nombre} ha sido creado correctamente.`, 'success');
        return resp.data;
      }));
} 
buscarHospital( termino: string ) { 
  // Recibe el término de búsqueda y retorna todos los hospitales que coincidan con ese término de búsqueda.

  const url = URL_SERVICIOS + '/buscar/collection/hospital/' + termino;
  return this.http.get(url)
    .pipe(map((resp: any) => {
       
      return resp.data;
    }));
  

} 
actualizarHospital( hospital: Hospital ) {// Recibe un hospital y lo actualiza.
  const url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${this.token}`;
  return this.http.put(url, hospital).pipe(map( (resp: any) => {
    swal('¡Enhorabuena!', `El hospital ${hospital.nombre} ha sido actualizado correctamente.`, 'success');
    return resp;
  }));
} 

}
