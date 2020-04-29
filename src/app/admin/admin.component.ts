import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin.service'
import { User1 } from '../services/user';
import {Organizer1 } from '../services/organizer';
import { User } from '../services/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { OrganizerService } from '../organizer.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
// user1: User1[];
// //user: User = new User();
// editingUser: User1;
// editing: boolean=false;
//   constructor(public adminSevice: AdminService, private router: Router,
//      private afAuth: AngularFireAuth, private userService: UserService) { }

//   ngOnInit(): void {
//     this.adminSevice.getUser().subscribe(user =>{
//       this.user1=user;
//     })
//   }
//   deleteUser(key: string){
//     this.userService.deleteUser(key);
//     }
//   edit(event, user){
//     this.editingUser=user;
//     this.editing=!this.editing;
//   }
//   updateUser(){
//     this.userService.updateUser(this.editingUser);
//     this.editingUser={} as User1;
//     this.editing=false;
//   }
organizer1: Organizer1[];
editingOganizer: Organizer1;
editing: boolean=false;
  constructor(public adminSevice: AdminService, private router: Router,
     private afAuth: AngularFireAuth, private oganizerService: OrganizerService) { }

  ngOnInit(): void {
    this.adminSevice.getOrganizer().subscribe(organizer =>{
      this.organizer1=organizer;
    })
  }
  deleteOrganizer(key: string){
    this.oganizerService.deleteOrganizer(key);
    }
  edit(event, organizer){
    this.editingOganizer=organizer;
    this.editing=!this.editing;
  }
  updateOrganizer(){
    this.oganizerService.updateOrganizer(this.editingOganizer);
    this.editingOganizer={} as Organizer1;
    this.editing=false;
  }

}
