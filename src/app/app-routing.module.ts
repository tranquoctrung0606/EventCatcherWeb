import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component'
import { SignupComponent } from './signup/signup.component';
import { CreateEventComponent } from './create-event/create-event.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'test', component: TestComponent},
  {path:'sign-up', component: SignupComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'create-event', component: CreateEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
