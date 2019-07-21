import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

import { TokenGuard, AdminGuard } from '../services/service.index';
 
const pagesRoutes: Routes =  [
    // {
    //     path: '',
    //     component: PagesComponent,
    //     canActivate: [LoginGuardGuard],
    //     children: [
            {path: 'dashboard', canActivate: [TokenGuard], component: DashboardComponent, data: {title: 'Dashboard'} },
            {path: 'progress', component: ProgressComponent, data: {title: 'Barra de progreso'} },
            {path: 'grafica1', component: Graficas1Component, data: {title: 'Gráficos'} },
            {path: 'promesas', component: PromesasComponent, data: {title: 'Promesas'} },
            {path: 'rxjs', component: RxjsComponent, data: {title: 'Reactive extension'} },
            {path: 'profile', component: ProfileComponent, data: {title: 'Mi perfil'} },
            {path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Configuración'} },
            {path: 'busqueda/:termino', component: BusquedaComponent, data: {title: 'Búsqueda'} },

            // Mantenimiento
            {path: 'hospital', component: HospitalesComponent, data: {title: 'Mantenimiento de hospitales'} },
            {path: 'usuario', canActivate: [AdminGuard], component: UsuariosComponent, data: {title: 'Mantenimiento de usuarios'} },
            {path: 'medico', component: MedicosComponent, data: {title: 'Mantenimiento de médicos'} },
            {path: 'medico/:id', component: MedicoComponent, data: {title: 'Mantenimiento de médicos'} },
            {path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    //     ]
    // }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
