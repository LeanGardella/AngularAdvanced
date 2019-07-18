import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public _us: UsuarioService, public router: Router) { }

  ngOnInit() {
  }

  buscar(term: string) {
    this.router.navigate(['/busqueda', term]);
  }
}
