import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms"

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';


@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
