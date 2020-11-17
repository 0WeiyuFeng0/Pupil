import { AddInfoComponent } from './pages/add-info/add-info.component';
import { AuthJSONGuard } from './services/auth-json.guard';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { PatientComponent } from './pages/patient/patient.component';
import { RegisterComponent } from './register/register.component';
import { logging } from 'protractor';
import { AuthGuard } from './services/auth.guard';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component'
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'login', component: LoginComponent,},
  { path: 'register', component: RegisterComponent,},
  { path: 'patient', component: PatientComponent, canActivate: [AuthJSONGuard],},
  { path: 'list', component: PatientListComponent, canActivate: [AuthJSONGuard],},
  { path: 'addInfo', component: AddInfoComponent,canActivate: [AuthJSONGuard],},
  { path: '', component: LoginComponent,},
  { path: '**', component: LoginComponent,},
  { path: 'secret', component: SuperSecretComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
