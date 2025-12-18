import { Type } from '@angular/core';
import { Route, Routes } from '@angular/router';
export type RouteWithMeta = Route & {
    description?: string,
    category?: string,
    subcategory?: string,

};
export type RoutesWithMeta = RouteWithMeta[];

export const routes: RoutesWithMeta = [
    {
        path: 'autho',
        title: 'Appliance Autho',
        category: 'Mock-Ups',
        loadComponent: () => import('./mock-ups/work-order-lines/work-order-lines.component').then(r => r.WorkOrderLinesComponent)
    },
    {
        path: 'record',
        title: 'Record',
        category: 'Widgets',
        loadComponent: () => import('./widgets/record/record.component').then(r => r.RecordComponent)
    },
    {
        path: 'cogent-load-curly',
        category: 'Load Screens',
        subcategory: 'Other',
        title: 'Cogent Load Curly',
        loadComponent: () => import('./load-screens/cogent-load-curly/cogent-load-curly.component').then(r => r.CogentLoadCurlyComponent)
    },
    {
        path: 'cogent-load-hex',
        category: 'Load Screens',
        title: 'Cogent Load Hex',
        subcategory: 'Other',
        loadComponent: () => import('./load-screens/cogent-load-hex/cogent-load-hex.component').then(r => r.CogentLoadHexComponent)
    },
    {
        path: 'cogent-load-vert-lines',
        category: 'Load Screens',
        title: 'Cogent Load Vert Lines',
        subcategory: 'Other',
        loadComponent: () => import('./load-screens/cogent-load-vert-lines/cogent-load-vert-lines.component').then(r => r.CogentLoadVertLinesComponent)
    },
    {
        path: 'cogent-load-pulse',
        category: 'Load Screens',
        title: 'Cogent Load Pulse',
        subcategory: 'Other',
        loadComponent: () => import('./load-screens/cogent-load-pulse/cogent-load-pulse.component').then(r => r.CogentLoadPulseComponent)
    },
    {
        path: 'new-years-2026',
        category: 'Load Screens',
        title: 'New Years 2026',
        subcategory: 'Winter',
        loadComponent: () => import('./load-screens/new-years-2026/new-years-2026.component').then(r => r.NewYears2026Component)
    },
    {
        path: 'major-award-christmas',
        category: 'Load Screens',
        title: 'Major Award Christmas',
        subcategory: 'Winter',
        loadComponent: () => import('./load-screens/major-award-christmas/major-award-christmas.component').then(r => r.MajorAwardChristmasComponent)
    },
    {
        path: 'halloween-2',
        category: 'Load Screens',
        title: 'Halloween 2',
        subcategory: 'Fall',
        loadComponent: () => import('./load-screens/halloween-2/halloween-2.component').then(r => r.Halloween2Component)
    },
    {
        path: 'cogent-load-radial',
        category: 'Load Screens',
        title: 'Cogent Load Radial',
        subcategory: 'Other',
        loadComponent: () => import('./load-screens/cogent-load-radial/cogent-load-radial.component').then(r => r.CogentLoadRadialComponent)
    },
    {
        path: 'cogent-load-bubbles',
        category: 'Load Screens',
        title: 'Cogent Load Bubbles',
        subcategory: 'Other',
        loadComponent: () => import('./load-screens/cogent-load-bubbles/cogent-load-bubbles.component').then(r => r.CogentLoadBubblesComponent),
    },
    {
        path: 'cogent-load-pong',
        category: 'Load Screens',
        title: 'Cogent Load Pong',
        subcategory: 'Game',
        loadComponent: () => import('./load-screens/cogent-load-pong/cogent-load-pong.component').then(r => r.CogentLoadPongComponent),
    },
    {
        path: 'cogent-load-halloween',
        category: 'Load Screens',
        title: 'Cogent Load Halloween',
        subcategory: 'Fall',
        loadComponent: () => import('./load-screens/cogent-load-halloween/cogent-load-halloween.component').then(r => r.CogentLoadHalloweenComponent),
    },
    {
        path: 'cogent-load-summer',
        category: 'Load Screens',
        title: 'Cogent Load Summer',
        subcategory: 'Summer',
        loadComponent: () => import('./load-screens/cogent-load-summer/cogent-load-summer.component').then(r => r.CogentLoadSummerComponent),
    },
    {
        path: 'cogent-load-independence',
        category: 'Load Screens',
        title: 'Cogent Load Independence',
        subcategory: 'Summer',
        loadComponent: () => import('./load-screens/cogent-load-independence/cogent-load-independence.component').then(r => r.CogentLoadIndependenceComponent),
    },
    {
        path: 'cogent-load-birthday',
        category: 'Load Screens',
        title: 'Cogent Load Birthday',
        subcategory: 'Other',
        loadComponent: () => import('./load-screens/cogent-load-birthday/cogent-load-birthday.component').then(r => r.CogentLoadBirthdayComponent),
    },
    {
        path: 'clip-path-test',
        category: 'Experiments',
        title: 'Clip Path Test',
        loadComponent: () => import('./experiments/clip-path-test/clip-path-test.component').then(r => r.ClipPathTestComponent),
    },
    {
        path: 'image-resize',
        category: 'Experiments',
        title: 'Image Resize',
        loadComponent: () => import('./experiments/image-resize/image-resize.component').then(r => r.ImageResizeComponent),
    },
    {
        path: 'cogent-load-christmas',
        category: 'Load Screens',
        title: 'Cogent Load Christmas',
        subcategory: 'Winter',
        loadComponent: () => import('./load-screens/cogent-load-christmas/cogent-load-christmas.component').then(r => r.CogentLoadChristmasComponent),
    },
    {
        path: 'cogent-load-thanksgiving',
        category: 'Load Screens',
        title: 'Cogent Load Thanksgiving',
        subcategory: 'Fall',
        loadComponent: () => import('./load-screens/cogent-load-thanksgiving/cogent-load-thanksgiving.component').then(r => r.CogentLoadThanksgivingComponent),
    },
    {
        path: 'cogent-load-st-patricks',
        category: 'Load Screens',
        title: 'Cogent Load St Patricks',
        subcategory: 'Spring',
        loadComponent: () => import('./load-screens/cogent-load-st-patricks/cogent-load-st-patricks.component').then(r => r.CogentLoadStPatricksComponent),
    },
    {
        path: 'cogent-load-valentines-day',
        category: 'Load Screens',
        title: 'Cogent Load Valentines Day',
        subcategory: 'Spring',
        loadComponent: () => import('./load-screens/cogent-load-valentines-day/cogent-load-valentines-day.component').then(r => r.CogentLoadValentinesDayComponent)
    },
    {
        path: 'cogent-load-waves',
        category: 'Load Screens',
        title: 'Cogent Load Waves',
        subcategory: 'Other',
        loadComponent: () => import('./load-screens/cogent-load-waves/cogent-load-waves.component').then(r => r.CogentLoadWavesComponent),
    },
    {
        path: 'cogent-load-ball',
        category: 'Load Screens',
        title: 'Cogent Load Ball',
        subcategory: 'Other',
        loadComponent: () => import('./load-screens/cogent-ball-load/cogent-ball-load.component').then(r => r.CogentBallLoadComponent),
    },
    {
        path: 'cogent-load-pixels',
        category: 'Load Screens',
        title: 'Cogent Load Pixels',
        subcategory: 'Game',
        loadComponent: () => import('./load-screens/cogent-load-pixels/cogent-load-pixels.component').then(r => r.CogentLoadPixelsComponent),
    },
    {
        path: 'cogent-load-neumorphism',
        category: 'Load Screens',
        title: 'Cogent Load Neumorphism',
        subcategory: 'Other',
        loadComponent: () => import('./load-screens/cogent-load-neumorphism/cogent-load-neumorphism.component').then(r => r.CogentLoadNeumorphismComponent),
    },
    {
        path: 'cogent-load-edge-glow',
        category: 'Load Screens',
        title: 'Cogent Load Edge Glow',
        subcategory: 'Other',
        loadComponent: () => import('./load-screens/cogent-load-edge-glow/cogent-load-edge-glow.component').then(r => r.CogentLoadEdgeGlowComponent),
    },
    {
        path: 'shopping',
        category: 'Mock-Ups',
        title: 'Shopping',
        loadComponent: () => import('./mock-ups/shopping/shopping/shopping.component').then(r => r.ShoppingComponent),
    },
    {
        path: 'cogent-load-spring',
        category: 'Load Screens',
        title: 'Cogent Load Spring',
        subcategory: 'Spring',
        loadComponent: () => import('./load-screens/cogent-load-spring/cogent-load-spring.component').then(r => r.CogentLoadSpringComponent),
    },
    {
        path: 'box-test',
        category: 'Experiments',
        title: 'Box Test',
        loadComponent: () => import('./experiments/box-test/box-test.component').then(r => r.BoxTestComponent),
    },
    {
        path: 'wig-visual',
        category: 'Mock-Ups',
        title: 'Wig Visual',
        loadComponent: () => import('./mock-ups/wig-visual/wig-visual.component').then(r => r.WigVisualComponent),
    },
    {
        path: 'contractor-home',
        category: 'Mock-Ups',
        title: 'Contractor Home Re-Design',
        loadComponent: () => import('./mock-ups/contractor-home-re-design/contractor-home-re-design.component').then(r => r.ContractorHomeReDesignComponent),
    },
    {
        path: 'gears',
        category: 'Experiments',
        title: 'Gears Test',
        loadComponent: () => import('./experiments/gears-test/gears-test.component').then(r => r.GearsTestComponent),
    },
    {
        path: 'edge',
        category: 'Experiments',
        title: 'Edge Glow',
        loadComponent: () => import('./experiments/edge-glow/edge-glow.component').then(r => r.EdgeGlowComponent),
    },
    {
        path: 'back-to-school',
        category: 'Mock-Ups',
        title: 'Back To School',
        loadComponent: () => import('./mock-ups/back-to-school/back-to-school.component').then(r => r.BackToSchoolComponent),
    },
    {
        path: 'wallpaper',
        category: 'Mock-Ups',
        title: 'Wallpaper',
        loadComponent: () => import('./mock-ups/wallpaper/wallpaper.component').then(r => r.WallpaperComponent),
    },
    {
        path: 'appliance-autho',
        category: 'Mock-Ups',
        title: 'Appliance Autho',
        loadComponent: () => import('./mock-ups/appliance-autho/appliance-autho.component').then(r => r.ApplianceAuthoComponent),
    },
    {
        path: 'dashboard',
        title: 'Dashboard',
        category: 'Mock-Ups',
        loadComponent: () => import('./mock-ups/dashboard/dashboard.component').then(r => r.DashboardComponent),
    },
    {
        path: 'throb',
        title: 'Throb Test',
        category: 'Widgets',
        loadComponent: () => import('./widgets/throb-test/throb-test.component').then(r => r.ThrobTestComponent),
    },
    {
        path: 'communication-hub',
        title: 'Communication Hub',
        category: 'Mock-Ups',
        loadComponent: () => import('./mock-ups/communication-hub/communication-hub.component').then(r => r.CommunicationHubComponent),
    },
    {
        path: 'reactive-forms-test',
        title: 'Reactive Forms Test',
        category: 'Experiments',
        loadComponent: () => import('./experiments/reactive-forms-test/reactive-forms-test.component').then(r => r.ReactiveFormsTestComponent),
    },
    {
        path: 'diagram-editor',
        title: 'Diagram Editor',
        category: 'Mock-Ups',
        loadComponent: () => import('./mock-ups/diagram-editor/diagram-editor.component').then(r => r.DiagramEditorComponent),
    },
    {
        path: 'bottom-menu',
        title: 'Bottom Menu',
        category: 'Widgets',
        loadComponent: () => import('./widgets/bottom-menu/bottom-menu.component').then(r => r.BottomMenuComponent),
    },
    {
        path: 'lottie',
        title: 'Lottie',
        category: 'Dependencies',
        loadComponent: () => import('./dependencies/dot-lottie/dot-lottie.component').then(r => r.DotLottieComponent),
    },
    {
        path: 'native-dialog',
        title: 'Native Dialog',
        category: 'Experiments',
        loadComponent: () => import('./experiments/native-dialog-test/native-dialog-test.component').then(r => r.NativeDialogTestComponent),
    },
    {
        path: 'native-popover',
        title: 'Native Popover',
        category: 'Experiments',
        loadComponent: () => import('./experiments/native-popover-test/native-popover-test.component').then(r => r.NativePopoverTestComponent),
    },
    {
        path: 'info-call-out',
        title: 'Info Call Out',
        category: 'Widgets',
        loadComponent: () => import('./widgets/info-call-out/info-call-out.component').then(r => r.InfoCallOutComponent),
    },
    {
        path: 'count-wig',
        title: 'Customer Count Wig Visual',
        category: 'Mock-Ups',
        loadComponent: () => import('./mock-ups/customer-count-wig-visual/customer-count-wig-visual.component').then(r => r.CustomerCountWigVisualComponent),
    },
    {
        path: 'pie',
        title: 'Pie Component',
        category: 'Widgets',
        loadComponent: () => import('./widgets/pie/pie.component').then(r => r.PieComponent),
    },
    {
        path: 'cogent-load-dark-and-shiny',
        category: 'Load Screens',
        subcategory: 'Other',
        title: 'Cogent Load Dark And Shiny',
        loadComponent: () => import('./load-screens/cogent-load-dark-and-shiney/cogent-load-dark-and-shiney.component').then(r => r.CogentLoadDarkAndShineyComponent),
    },
    {
        path: 'weather-slide',
        title: 'Weather Slide',
        category: 'Mock-Ups',
        loadComponent: () => import('./mock-ups/weather-slide/weather-slide.component').then(r => r.WeatherSlideComponent),
    },
    {
        path: 'neumorphism-load',
        category: 'Load Screens',
        subcategory: 'Other',
        title: 'Neumorphism Load',
        loadComponent: () => import('./load-screens/neumorphism-load/neumorphism-load.component').then(r => r.NeumorphismLoadComponent),
    },
    {
        path: 'dark-button',
        title: 'Dark Button',
        category: 'Widgets',
        loadComponent: () => import('./widgets/dark-button/dark-button.component').then(r => r.DarkButtonComponent),
    },
    {
        path: 'cogent-load-halloween-2',
        category: 'Load Screens',
        title: 'Cogent Load Halloween 2',
        subcategory: 'Fall',
        loadComponent: () => import('./load-screens/cogent-load-halloween-2/cogent-load-halloween-2.component').then(r => r.CogentLoadHalloween2Component),
    },
    {
        path: 'cogent-load-launch',
        category: 'Load Screens',
        title: 'Cogent Load Launch',
        subcategory: 'Other',
        loadComponent: () => import('./load-screens/cogent-launch-plans/cogent-launch-plans.component').then(r => r.CogentLaunchPlansComponent),
    },
    {
        path: 'polaroid-carousel',
        title: 'Polaroid Carousel Demo',
        category: 'Widgets',
        loadComponent: () => import('./widgets/polaroid-carousel-demo/polaroid-carousel-demo.component').then(r => r.PolaroidCarouselDemoComponent),
    },
    {
        path: 'rive',
        title: 'Rive Component',
        category: 'Dependencies',
        loadComponent: () => import('./experiments/rive/rive.component').then(r => r.RiveComponent),
    },
    {
        path: 'find-ae',
        title: 'Find AE Component',
        category: 'Experiments',
        loadComponent: () => import('./experiments/find-ae/find-ae.component').then(r => r.FindAeComponent),
    },
    {
        path: '3-d',
        title: '3D Test Component',
        category: 'Experiments',
        loadComponent: () => import('./experiments/three-d-test/three-d-test.component').then(r => r.ThreeDTestComponent),
    },
    {
        path: 'cpoh',
        title: 'CPOH Homeowner Portal',
        category: 'Mock-Ups',
        loadComponent: () => import('./mock-ups/cpoh/homeowner/cpoh-homeowner-portal/cpoh-homeowner-portal').then(r => r.CpohHomeownerPortal),
    },
    {
        path: '',
        loadComponent: () => import('./menu/menu.component').then(r => r.MenuComponent)
    }
];
