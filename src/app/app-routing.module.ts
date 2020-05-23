import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { AddorganizerComponent } from './addorganizer/addorganizer.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { OverviewOrganizerComponent } from './overview-organizer/overview-organizer.component';
import{AdminUsermanagementComponent} from './admin-usermanagement/admin-usermanagement.component'
import { AuthGuard } from "./auth/auth.guard";

import { LoginModule } from './login/login.module'
import { AdminModule } from './admin/admin.module'
import { AdminModule1 } from './admin/admin1.module'

const routes: Routes = [
  { path: 'login', loadChildren: () => LoginModule},
  { path: '', loadChildren: () => LoginModule},
  { path: 'signup', component: SignupComponent },
  { path: 'admin', canActivate:[AuthGuard],data:{roles:["admin"]}, component:AdminHomeComponent},
  { path: 'overviewOrganizer', component: OverviewOrganizerComponent},
  { path: 'admin/organizer', canActivate:[AuthGuard], data: {roles: ["admin"]} ,loadChildren: () => AdminModule },
  { path: 'admin/user', canActivate:[AuthGuard], data: {roles: ["admin"]} ,loadChildren: () => AdminModule1 },
  { path: 'organizer/eventmanage', canActivate:[AuthGuard], component: OrganizerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
