import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import( './features/auth/login/page/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'register',
    loadChildren: () => import( './features/auth/register/page/register.module').then( m => m.RegisterModule )
  },
  {
    path: '**',
    redirectTo: 'auth'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
