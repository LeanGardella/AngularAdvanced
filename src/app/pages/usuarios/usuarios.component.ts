import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  total = 0;
  cargando = true;
  buscando = false;

  constructor(
    public _us: UsuarioService,
    public _mu: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._mu.notificacion.subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.buscando = false;
    this._us.cargarUsuarios(this.desde)
      .subscribe( (resp: any) => {
        // console.log(resp);
        this.total = resp.count;
        this.usuarios = resp.data;
        this.cargando = false;
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
   
   this.cargarUsuarios();
   return;
  }

  buscarUsuarios( termino: string ) {
    if ( termino.length < 1 ) {
      this.cargarUsuarios();
      return;
    }
    this.buscando = true;
    this.cargando = true;
    this._us.buscarUsuarios(termino)
      .subscribe( (us: Usuario[]) => {
        this.usuarios = us;
        this.cargando = false;
      });
  }

  borrarUsuario(u: Usuario) {
    if ( u._id === this._us.usuario._id ) {// intenta borrarse a si mismo
      swal('Acción inválida', `El usuario ${u.nombre} ${u.apellido} está intentando borrarse a sí mismo.`, 'error');
    } else {
      swal( {
        title: `¿Desea eliminar a ${u.nombre} ${u.apellido}?`,
        text: 'Una vez eliminado, deberá volver a registrarse.',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      } )
      .then((willDelete) => {
        if (willDelete) {
          this._us.borrarUsuario(u._id)
            .subscribe(
              resp => {
                swal(`El usuario ${u.nombre} ${u.apellido} se ha eliminado.`, {
                  icon: 'success',
                });
                console.log(resp);
                this.cargarUsuarios();
              }
            );
        } 
      });
    }
  }

  guardarUsuario(u: Usuario) {
    this._us.actualizar(u).subscribe();
  }

  mostrarModal ( id: string) {
    this._mu.mostrarModal('usuario', id);
  }

}
