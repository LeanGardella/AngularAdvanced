import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, SettingsService, SidebarService } from './service.index';

@NgModule({
  declarations: [],
  providers: [
    SharedService,
SettingsService,
SidebarService
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule { }
