import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Auth } from './services/auth.guard';

export const APPROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/workouts',
        data: {
            // Uses static text (Home)
            breadcrumbs: 'Home'
        }
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(APPROUTES, { useHash: true });
