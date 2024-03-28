import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'autho',
        loadComponent: () => import('./autho/autho.component').then(r => r.AuthoComponent)
    }
];
