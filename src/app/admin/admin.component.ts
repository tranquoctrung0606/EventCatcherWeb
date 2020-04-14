import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin.service'
import { User } from '../services/user';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
user: User[];
  constructor(public adminSevice: AdminService) { }

  ngOnInit(): void {
    this.adminSevice.getUser().subscribe(user =>{
      this.user=user;
    })
  }

}
