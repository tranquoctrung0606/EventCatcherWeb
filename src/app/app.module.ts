import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from '@agm/core';


import { SignupComponent } from './signup/signup.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import firebaseConfig from './firebase';
import { OrganizerComponent } from './organizer/organizer.component';
import { AdminComponent } from './admin/admin.component';
import { environment } from '../environments/environment';
import {AdminService} from './services/admin.service';
import { AddorganizerComponent } from './addorganizer/addorganizer.component';
import * as firebase from 'firebase';
import { AdminHomeComponent } from './admin-home/admin-home.component'
import { OrganizerService } from './organizer.service';
import { AngularFireChartsModule } from '@benpeterscode/angularfirecharts';
import { OverviewOrganizerComponent } from './overview-organizer/overview-organizer.component';
import { AdminUsermanagementComponent } from './admin-usermanagement/admin-usermanagement.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DemoMaterialModule } from './material-modul'

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SignupComponent,
    OrganizerComponent,
    AddorganizerComponent,
    AdminHomeComponent,
    OverviewOrganizerComponent,
    AdminUsermanagementComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBDRdC_rsgZ5sFVR6cqdhb5pAXkxB2c6Yk",
      //apiKey: "AIzaSyDxrfhNPaOeResHsBuC945MAmuXlIjEBys",
      libraries: ["places", "geometry"]
    }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularafs'),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFireChartsModule,
    DemoMaterialModule
  ],
  providers: [AdminService, OrganizerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
