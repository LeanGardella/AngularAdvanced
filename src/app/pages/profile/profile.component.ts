import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _us: UsuarioService
  ) { 
    this.usuario = this._us.usuario;
  }

  ngOnInit() {
  }

  guardar (usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.apellido = usuario.apellido;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }
    this._us.actualizar(this.usuario).subscribe( );
  }

  subirImagen( file: File ) {
    if ( !file ) {
      this.imagenSubir = null;
      return;
    }

    if ( file.type.indexOf('image') < 0) {
      swal('Archivo inválido', 'El archivo seleccionado no es una imagen válida.', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = file;
    const reader = new FileReader();
    const urlImgTmp = reader.readAsDataURL(file);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  actualizarImagen() {
    this._us.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
