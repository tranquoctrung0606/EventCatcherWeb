import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms"

import { AdminRoutingModule } from './admin-routing1.module';
import { AdminUsermanagementComponent } from './admin1.component';


@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [AdminUsermanagementComponent]
})
export class AdminModule1 { }
