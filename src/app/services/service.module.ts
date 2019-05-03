import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, SettingsService, SidebarService } from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './service.index';

@NgModule({
  declarations: [],
  providers: [
    SharedService,
    SettingsService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
