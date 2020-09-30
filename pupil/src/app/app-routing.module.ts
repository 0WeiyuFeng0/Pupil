import { logging } from 'protractor';
import { AuthGuard } from './services/auth.guard';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component'

const routes: Routes = [
  
  { path: 'login', component: LoginComponent,},
  { path: 'secret', component: SuperSecretComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
