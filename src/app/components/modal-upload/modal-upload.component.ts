import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/service.index';
import { constants } from 'os';
import { ModalUploadService } from './modal-upload.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _sa: SubirArchivoService,
    public _mu: ModalUploadService
  ) {
    
   }

  ngOnInit() { 
  }

  dispose() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._mu.ocultarModal();
  }

  guardarImg () {
    this._sa.subirArchivo(this.imagenSubir, this._mu.tipo, this._mu.id )
      .then( (resp: any) => {

        this._mu.notificacion.emit(resp);
        this.dispose();
      })
      .catch( err => {
        console.error('Error al subir imagen.' + err);
      });
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

}
