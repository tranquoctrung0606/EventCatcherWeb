import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component'
import { SignupComponent } from './signup/signup.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { OrganizerComponent } from './organizer/organizer.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', redirectTo: 'create-event', pathMatch: 'full' },
  {path:'test', component: TestComponent},
  {path:'signup', component: SignupComponent},
  {path:'create-event', component: CreateEventComponent},
  {path:'organizer', component: OrganizerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
