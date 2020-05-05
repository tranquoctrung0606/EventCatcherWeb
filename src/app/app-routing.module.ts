import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test/test.component';
import { SignupComponent } from './signup/signup.component';
//import { CreateEventComponent } from './create-event/create-event.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { AddorganizerComponent } from './addorganizer/addorganizer.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { OverviewOrganizerComponent } from './overview-organizer/overview-organizer.component';
import { AuthGuard } from "./auth/auth.guard";

import { LoginModule } from './login/login.module'
import { AdminModule } from './admin/admin.module'

const routes: Routes = [
  { path: 'login', loadChildren: () => LoginModule},
  { path: 'signup', component: SignupComponent },
  { path: 'admin', canActivate:[AuthGuard],data:{roles:["admin"]}, component:AdminHomeComponent},
  { path: 'overviewOrganizer', component: OverviewOrganizerComponent},
  { path: 'admin/organizer', canActivate:[AuthGuard], data: {roles: ["admin"]} ,loadChildren: () => AdminModule },
  { path: 'organizer', canActivate:[AuthGuard], component: OrganizerComponent},
  //{ path: 'create-event', component: CreateEventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
