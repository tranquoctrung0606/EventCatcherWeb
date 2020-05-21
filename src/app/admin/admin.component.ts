import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin.service'
import { User1 } from '../services/user';
import {Organizer1 } from '../services/organizer';
import { User } from '../services/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { OrganizerService } from '../organizer.service';
import { FirebaseService } from '../firebase.service'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

organizer1: Organizer1[];
editingOganizer: Organizer1;
editing: boolean=false;
user1: User1[];
editingUser: User1;
editing1: boolean=false;
  constructor(public adminSevice: AdminService, private router: Router,
     private afAuth: AngularFireAuth, private oganizerService: OrganizerService,
      private firebaseService: FirebaseService, private userSevice: UserService) { }

  ngOnInit(): void {
    this.adminSevice.getOrganizer().subscribe(organizer =>{
      this.organizer1=organizer;
    })
    this.adminSevice.getUser().subscribe(organizer =>{
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
 
  logout(){
    this.firebaseService.logOut();
  }
}
