import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { CreateEventComponent } from './create-event/create-event.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from '@agm/core';


import { SignupComponent } from './signup/signup.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import firebaseConfig from './firebase';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TestComponent,
    SignupComponent,
    CreateEventComponent
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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
