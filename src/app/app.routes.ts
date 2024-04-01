import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'autho',
        loadComponent: () => import('./work-order-lines/work-order-lines.component').then(r => r.WorkOrderLinesComponent)
    },
    {
        path: 'record',
        loadComponent: () => import('./record/record.component').then(r => r.RecordComponent)
    }
];
