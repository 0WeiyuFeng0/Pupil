import { AuthPatientGuard } from './services/auth-patient.guard';
import { AuthTestDataGuard } from './services/auth-test-data.guard';
import { TestViewComponent } from './pages/test-view/test-view.component';
import { AuthDoctorGuard } from './services/auth-doctor.guard';
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
  { path: 'login', component: LoginComponent,canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent,},
  { path: 'patient', component: PatientComponent, canActivate: [AuthJSONGuard, AuthPatientGuard],},
  { path: 'list', component: PatientListComponent, canActivate: [AuthJSONGuard, AuthDoctorGuard],},
  { path: 'testView', component: TestViewComponent, canActivate: [AuthJSONGuard, AuthDoctorGuard, AuthTestDataGuard],},
  { path: 'addInfo', component: AddInfoComponent,canActivate: [AuthJSONGuard],},
  { path: '', component: LoginComponent,canActivate: [AuthGuard]},
  { path: '**', component: LoginComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
