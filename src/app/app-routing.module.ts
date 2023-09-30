import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';
import { loginResetGuard } from './core/guards/login-reset.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import( './features/auth/login/page/auth.module').then( m => m.AuthModule ),
    canActivate : [loginResetGuard]
  },
  {
    path: 'register',
    loadChildren: () => import( './features/auth/register/page/register.module').then( m => m.RegisterModule ),
    canActivate : [loginResetGuard]
  },
  {
    path        : 'home',
    loadChildren: () => import( './features/home/home.module').then( m => m.HomeModule ),
    canActivate : [loginGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
