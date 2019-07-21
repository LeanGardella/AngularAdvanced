import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor( public _us: UsuarioService ) {

  }
  
  canActivate(): Promise<boolean> | boolean {

    console.log('Token Guard');

    const token = this._us.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirado = this.isExpired(payload.exp);

    if (expirado) {
      return false;
    }
    return true;
  }

  isExpired(fechaExp: number ) {
    const ahora = new Date().getTime() / 1000;
    return fechaExp < ahora;
  }

  checkToken(fechaExp: number): Promise<boolean> {

    return new Promise( (resolve, reject ) => {

      const ahora = new Date();
      const exp = new Date(fechaExp * 1000);
  
      ahora.setTime(ahora.getTime() + (10 * 60 * 1000));
      
      if ( exp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
          this._us.renovarToken().subscribe( () => {
          resolve(true);
        }, () => {
          reject(false);
        });
      }
    });
    
  }
}
