import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor( public _us: UsuarioService) { }

  canActivate() {
    if ( this._us.usuario.role === 'ADMIN_ROLE' ) {
      return true;
    } else {
      this._us.logout();
      return false;
    }
  }
}
