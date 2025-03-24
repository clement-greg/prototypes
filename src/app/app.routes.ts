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
        path: 'game',
        loadComponent: () => import('./game/game.component').then(r => r.GameComponent),
    },
    {
        path: 'cogent-load-christmas',
        loadComponent: () => import('./cogent-load-christmas/cogent-load-christmas.component').then(r => r.CogentLoadChristmasComponent),
    },
    {
        path: 'cogent-load-thanksgiving',
        loadComponent: () => import('./cogent-load-thanksgiving/cogent-load-thanksgiving.component').then(r => r.CogentLoadThanksgivingComponent),
    },
    {
        path: 'cogent-load-st-patricks',
        loadComponent: () => import('./cogent-load-st-patricks/cogent-load-st-patricks.component').then(r => r.CogentLoadStPatricksComponent),
    },
    {
        path: 'cogent-load-valentines-day',
        loadComponent: () => import('./cogent-load-valentines-day/cogent-load-valentines-day.component').then(r => r.CogentLoadValentinesDayComponent)
    },
    {
        path: 'cogent-load-waves',
        loadComponent: ()=> import('./cogent-load-waves/cogent-load-waves.component').then(r => r.CogentLoadWavesComponent),
    },
    {
        path: 'cogent-load-ball',
        loadComponent: () => import('./cogent-ball-load/cogent-ball-load.component').then(r => r.CogentBallLoadComponent),
    },
    {
        path: 'cogent-load-edge-glow',
        loadComponent: () => import('./cogent-load-edge-glow/cogent-load-edge-glow.component').then(r => r.CogentLoadEdgeGlowComponent),
    },
    {
        path: 'shopping',
        loadComponent: ()=> import('./shopping-demo/shopping/shopping.component').then(r => r.ShoppingComponent),
    },
    {
        path: 'cogent-load-spring',
        loadComponent: ()=> import('./cogent-load-spring/cogent-load-spring.component').then(r => r.CogentLoadSpringComponent),
    },
    {
        path: 'box-test',
        loadComponent: () => import('./box-test/box-test.component').then(r => r.BoxTestComponent),
    },
    {
        path: 'wig-visual',
        loadComponent: () => import('./wig-visual/wig-visual.component').then(r => r.WigVisualComponent),
    },
    {
        path: 'contractor-home',
        loadComponent: () => import('./contractor-home-re-design/contractor-home-re-design.component').then(r => r.ContractorHomeReDesignComponent),
    },
    {
        path: 'gears',
        loadComponent: () => import('./gears-test/gears-test.component').then(r => r.GearsTestComponent),
    },
    {
        path: 'edge',
        loadComponent: () => import('./edge-glow/edge-glow.component').then(r => r.EdgeGlowComponent),
    },
    {
        path: 'back-to-school',
        loadComponent: () => import('./back-to-school/back-to-school.component').then(r => r.BackToSchoolComponent),
    },
    {
        path: 'wallpaper',
        loadComponent: () => import('./wallpaper/wallpaper.component').then(r => r.WallpaperComponent),
    },
    {
        path: 'appliance-autho',
        loadComponent: () => import('./appliance-autho/appliance-autho.component').then(r => r.ApplianceAuthoComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(r => r.DashboardComponent),
    },
    {
        path: 'throb',
        loadComponent: () => import('./throb-test/throb-test.component').then(r => r.ThrobTestComponent),
    },
    {
        path: 'communication-hub',
        loadComponent: () => import('./communication-hub/communication-hub.component').then(r => r.CommunicationHubComponent),
    },
    {
        path: 'reactive-forms-test',
        loadComponent: () => import('./reactive-forms-test/reactive-forms-test.component').then(r => r.ReactiveFormsTestComponent),
    },
    {
        path: 'diagram-editor',
        loadComponent: () => import('./diagram-editor/diagram-editor.component').then(r => r.DiagramEditorComponent),
    },
    {
        path: 'bottom-menu',
        loadComponent: () => import('./bottom-menu/bottom-menu.component').then(r => r.BottomMenuComponent),
    },
    {
        path: 'lottie',
        loadComponent: () => import('./dot-lottie/dot-lottie.component').then(r => r.DotLottieComponent),
    },
    {
        path: 'native-dialog',
        loadComponent: () => import('./native-dialog-test/native-dialog-test.component').then(r => r.NativeDialogTestComponent),
    },
    {
        path: 'native-popover',
        loadComponent: () => import('./native-popover-test/native-popover-test.component').then(r => r.NativePopoverTestComponent),
    },
    {
        path: 'info-call-out',
        loadComponent: () => import('./info-call-out/info-call-out.component').then(r => r.InfoCallOutComponent),
    },
    {
        path: 'count-wig',
        loadComponent: () => import('./customer-count-wig-visual/customer-count-wig-visual.component').then(r => r.CustomerCountWigVisualComponent),
    },
    {
        path: 'pie',
        loadComponent: () => import('./pie/pie.component').then(r => r.PieComponent),
    },
    {
        path: 'cogent-load-dark-and-shiny',
        loadComponent: ()=> import('./cogent-load-dark-and-shiney/cogent-load-dark-and-shiney.component').then(r => r.CogentLoadDarkAndShineyComponent),
    },
    {
        path: 'weather-slide',
        loadComponent: ()=> import('./weather-slide/weather-slide.component').then(r => r.WeatherSlideComponent),
    },
    {
        path: 'neumorphism-load',
        loadComponent: () => import('./neumorphism-load/neumorphism-load.component').then(r => r.NeumorphismLoadComponent),
    },
    {
        path: '',
        loadComponent: () => import('./menu/menu.component').then(r => r.MenuComponent)
    }
];
