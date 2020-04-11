import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {MatTableModule, MatInputModule} from '@angular/material';
import {HttpClientModule} from "@angular/common/http";
import { TestComponent } from './test/test.component';
import { AgmCoreModule } from '@agm/core'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDxrfhNPaOeResHsBuC945MAmuXlIjEBys",
      libraries: ["places", "geometry"]
    }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
