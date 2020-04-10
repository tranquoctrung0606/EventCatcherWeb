import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'create-event', component: CreateEventComponent},
  {path:'sign-up', component:SignupComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
