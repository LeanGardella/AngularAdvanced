import { NgModule } from '@angular/core';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { ChartsModule } from 'ng2-charts';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';




@NgModule({
    declarations: [
        IncrementadorComponent,
        GraficoDonaComponent
    ], 
    exports: [
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    imports: [
        FormsModule,
        ChartsModule,
        CommonModule,
        PipesModule
    ]
})

export class ComponentsModule { }
