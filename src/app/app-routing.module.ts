import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { SignupComponent } from './signup/signup.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { AdminComponent } from './admin/admin.component';
import { AddorganizerComponent } from './addorganizer/addorganizer.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { OverviewOrganizerComponent } from './overview-organizer/overview-organizer.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'test', component: TestComponent},
  {path:'signup', component: SignupComponent},
  {path:'create-event', component: CreateEventComponent},
  {path:'organizer', component: OrganizerComponent},
  {path: 'admin/organizer', component: AdminComponent},
  {path: 'addorganizer', component:AddorganizerComponent},
  {path:'admin', component:AdminHomeComponent},
  {path: 'overviewOrganizer', component: OverviewOrganizerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
