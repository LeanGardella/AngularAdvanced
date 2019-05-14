import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, SettingsService, SidebarService } from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './service.index';
import { SubirArchivoService } from './subirArchivo/subir-archivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  providers: [
    SharedService,
    SettingsService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
