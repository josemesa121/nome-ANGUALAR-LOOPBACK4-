import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from '../../layouts/auth-layout.component';
import { Auth } from '../../services/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MainLayoutComponent } from '../../layouts/main-layout.component';

const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent 
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [Auth]
            }
        ]
    },
    {
        path: 'account',
        component: MainLayoutComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [Auth]
            }
        ]
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
