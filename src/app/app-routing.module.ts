import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'create-event', component: CreateEventComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
