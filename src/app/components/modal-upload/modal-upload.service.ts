import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto = 'ocultable';

  public notificacion = new EventEmitter<any> ();

  constructor() {
    console.log('modal upload');
  }

  ocultarModal() {
    this.oculto = 'ocultable';
    this.tipo = null;
    this.id = null;     
  }
  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
  }
}
