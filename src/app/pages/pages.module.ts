import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

// Routes
import { PAGES_ROUTES } from './pages.routes';

// ng2-charts
import { ChartsModule } from 'ng2-charts';


@NgModule({
    declarations: [
        // Aquí van todos los componentes que quiera incluir
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    exports: [
        // Aquí van los componentes que quiero que estén disponibles para otros componentes fuera de este módulo
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        ComponentsModule,
        ChartsModule
    ]
})

export class PagesModule { }
