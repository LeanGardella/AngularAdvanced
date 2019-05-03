import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';


declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;
  auth2: any;

  constructor(private _router: Router, private _us: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.initGoogle();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  initGoogle() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '702717162989-kje5ujm8tamuf1d27cesc5885nkcn3p9.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._us.loginGoogle(token)
        .subscribe(resp => window.location.href = '#/dashboard');
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
      const usuario = new Usuario(null, null, forma.value.email, forma.value.password);
      this._us.login(usuario, forma.value.recuerdame).subscribe(resp => this._router.navigate(['/dashboard']));
  }

}

