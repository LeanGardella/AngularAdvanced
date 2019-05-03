import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.cargar();
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  isLogged() {
    return (this.token.length > 2) ? true : false;
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

  guardar ( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token}).pipe(map((resp: any) => this.guardar(resp.id, resp.token, resp.data)));
  }

  login(usuario: Usuario, recordar: boolean = false) { 
    const url = URL_SERVICIOS + '/login';

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(url, usuario).pipe(map((resp: any) => {
      // localStorage.setItem('id', resp.id);
      // localStorage.setItem('token', resp.token);
      // localStorage.setItem('usuario', JSON.stringify(resp.data));
      this.guardar(resp.id, resp.token, resp.data);
      return true;
    }));
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        
        swal('¡Bienvenido!', `El usuario ${usuario.nombre} ${usuario.apellido} ha sido creado correctamente.`, 'success');
        return resp.usuario;
      }));
  }
}
