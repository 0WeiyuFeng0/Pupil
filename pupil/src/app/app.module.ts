import { AuthJSONGuard } from './services/auth-json.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { SuperSecretComponent } from './super-secret/super-secret.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { PatientCardComponent } from './pages/patient-card/patient-card.component';
import { PatientComponent } from './pages/patient/patient.component';
import { ListComponent } from './pages/list/list.component';
import { DataAnalysisComponent } from './pages/data-analysis/data-analysis.component';
import { AddInfoComponent } from './pages/add-info/add-info.component';
import { TestViewComponent } from './pages/test-view/test-view.component';



@NgModule({
  declarations: [
    AppComponent,
    GoogleLoginComponent,
    SuperSecretComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    SideBarComponent,
    PatientListComponent,
    PatientCardComponent,
    PatientComponent,
    ListComponent,
    DataAnalysisComponent,
    AddInfoComponent,
    TestViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    FormsModule,      
    ReactiveFormsModule
  ],
  providers: [AuthJSONGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
