import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        NopagefoundComponent,
        BreadcrumsComponent
    ],
    exports: [
        SidebarComponent,
        HeaderComponent,
        NopagefoundComponent,
        BreadcrumsComponent
    ]
})

export class SharedModule { }
