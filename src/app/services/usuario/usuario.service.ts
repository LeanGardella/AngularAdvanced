import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient, 
    public router: Router,
    public _subir: SubirArchivoService
    ) {
    this.cargar();
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  isLogged() {
    return (this.token.length > 2) ? true : false;
  }

  cargar () {
    if (localStorage.getItem('token')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
      this.menu = JSON.parse(localStorage.getItem('menu'));

    } else {
      this.usuario = null;
      this.token = '';
      this.menu = [];
    }
  }

  guardar ( id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token}).pipe(map((resp: any) => this.guardar(resp.id, resp.token, resp.data, resp.menu)));
  }

  login(usuario: Usuario, recordar: boolean = false) { 
    const url = URL_SERVICIOS + '/login';

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(url, usuario).pipe(map((resp: any) => {
      this.guardar(resp.id, resp.token, resp.data, resp.menu);
      return true;
    }),
    catchError( (err) => {
      swal('Credenciales incorrectas', 'Correo y/o contraseña incorrecta.', 'error');
      throw err;
    })
    );
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      .pipe(map((resp: any) => {
        
        swal('¡Bienvenido!', `El usuario ${usuario.nombre} ${usuario.apellido} ha sido creado correctamente.`, 'success');
        return resp.usuario;
      }),
      catchError( (err) => {
        console.log(err);
        swal(err.error.msg, err.error.err.message, 'error');
        throw err;
      })
      );
  }

  actualizar( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    console.log(url);
    return this.http.put(url, usuario).pipe(map( (resp: any) => {
      console.log(resp);

      if ( this.usuario._id === usuario._id ) {
        this.guardar(resp.data.id, this.token, resp.data, this.menu);
      }
      swal('¡Usuario actualizado!', `El usuario ${usuario.nombre} ${usuario.apellido} ha sido actualizado correctamente.`, 'success');
      return true;
    }));
  }


  cambiarImagen ( file: File, id: string) {
    this._subir.subirArchivo(file, 'usuario', id).then((resp: any) => {
      this.usuario.img = resp.data.img;
      swal('Imagen actualizada', 'La imagen de usuario se actualizó correctamente.', 'success');
      this.guardar(id, this.token, this.usuario, this.menu);
    })
    .catch(resp => {
      console.log(resp);
    });
  }

  cargarUsuarios(desde: number = 0) {
    if (desde < 0) {
      desde = 0;
    }
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios( termino: string ) {
    return this.http.get(URL_SERVICIOS + '/buscar/collection/usuario/' + termino)
      .pipe(map( (resp: any) => resp.data ));
  }

  borrarUsuario( id: string) {
    return this.http.delete(`${URL_SERVICIOS}/usuario/${id}?token=${this.token}`);
  }

  renovarToken( ) {
    const url = URL_SERVICIOS + '/login/renew?token=' + this.token;
    return this.http.post(url, null)
      .pipe(map((resp: any) => {
        this.token = resp.token;  
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( (err) => {
        console.log(err);
        swal('Error de autenticación', 'Imposible realizar la renovación del token. Las credenciales provistas no son válidas.', 'error');
        throw err;
      }));
  }
}
