import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminUsermanagementComponent} from "./admin1.component";

const routes: Routes = [
  { path: '', component: AdminUsermanagementComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }