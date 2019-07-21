import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        NopagefoundComponent,
        BreadcrumsComponent,
        ModalUploadComponent
    ],
    exports: [
        SidebarComponent,
        HeaderComponent,
        NopagefoundComponent,
        BreadcrumsComponent,
        ModalUploadComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PipesModule
    ]
})

export class SharedModule { }
