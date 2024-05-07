import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'autho',
        loadComponent: () => import('./work-order-lines/work-order-lines.component').then(r => r.WorkOrderLinesComponent)
    },
    {
        path: 'record',
        loadComponent: () => import('./record/record.component').then(r => r.RecordComponent)
    },
    {
        path: 'cogent-load-curly',
        loadComponent: () => import('./cogent-load-curly/cogent-load-curly.component').then(r => r.CogentLoadCurlyComponent)
    },
    {
        path: 'cogent-load-hex',
        loadComponent: () => import('./cogent-load-hex/cogent-load-hex.component').then(r => r.CogentLoadHexComponent)
    },
    {
        path: 'cogent-load-vert-lines',
        loadComponent: () => import('./cogent-load-vert-lines/cogent-load-vert-lines.component').then(r => r.CogentLoadVertLinesComponent)
    },
    {
        path: 'cogent-load-pulse',
        loadComponent: () => import('./cogent-load-pulse/cogent-load-pulse.component').then(r => r.CogentLoadPulseComponent)
    },
    {
        path: 'cogent-load-radial',
        loadComponent: () => import('./cogent-load-radial/cogent-load-radial.component').then(r => r.CogentLoadRadialComponent)
    },
    {
        path: 'cogent-load-bubbles',
        loadComponent: () => import('./cogent-load-bubbles/cogent-load-bubbles.component').then(r => r.CogentLoadBubblesComponent),
    },
    {
        path: 'cogent-load-pong',
        loadComponent: () => import('./cogent-load-pong/cogent-load-pong.component').then(r => r.CogentLoadPongComponent),
    },
    {
        path: 'cogent-load-halloween',
        loadComponent: () => import('./cogent-load-halloween/cogent-load-halloween.component').then(r => r.CogentLoadHalloweenComponent),
    },
    {
        path: 'cogent-load-summer',
        loadComponent: () => import('./cogent-load-summer/cogent-load-summer.component').then(r => r.CogentLoadSummerComponent),
    },
    {
        path: 'cogent-load-independence',
        loadComponent: () => import('./cogent-load-independence/cogent-load-independence.component').then(r => r.CogentLoadIndependenceComponent),
    },
    {
        path: 'cogent-load-birthday',
        loadComponent: () => import('./cogent-load-birthday/cogent-load-birthday.component').then(r => r.CogentLoadBirthdayComponent),
    },
    {
        path: 'clip-path-test',
        loadComponent: () => import('./clip-path-test/clip-path-test.component').then(r => r.ClipPathTestComponent),
    },
    {
        path: 'image-resize',
        loadComponent: () => import('./image-resize/image-resize.component').then(r => r.ImageResizeComponent),
    },
    {
        path: '',
        loadComponent: () => import('./menu/menu.component').then(r => r.MenuComponent)
    }
];
