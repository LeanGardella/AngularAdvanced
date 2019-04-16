import { Component, OnInit } from '@angular/core';


import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(  public _settings: SettingsService ) { }

  ngOnInit() {
    this.initCheck();
  }

  cambiaColor( tema: string , link: any) {
    this.check(link);
    this._settings.aplicarTema(tema);

  }

  check(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for (const ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  initCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._settings.ajustes.tema;
    for (const ref of selectores) {
      if (tema === ref.getAttribute('data-theme')) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
