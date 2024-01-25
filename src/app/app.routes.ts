import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { NoAuthGuard } from 'app/shared/guards/noAuth.guard';
import { LayoutComponent } from './shared/layouts/layout/layout.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboards' },
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboards' },
    {
        path: 'auth',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes') },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes') },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes') },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') },
            { path: 'verify-phone', loadChildren: () => import('app/modules/auth/verify-phone/verify-phone.routes') }
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {
                path: 'dashboards',  loadChildren: () => import('app/modules/dashboards/dashboard.resolver') 
            },
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/errors/error-404/error-404.routes') },
            { path: '**', redirectTo: '404-not-found' }
        ]
    }
];


