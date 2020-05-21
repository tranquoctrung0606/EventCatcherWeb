import { Component, OnInit } from '@angular/core';
import { User1 } from '../services/user';
import { AdminService } from '../services/admin.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-admin-usermanagement',
  templateUrl: './admin-usermanagement.component.html',
  styleUrls: ['./admin-usermanagement.component.scss']
})
export class AdminUsermanagementComponent implements OnInit {
user1: User1[];
editingUser: User1;
editing: boolean=false;
  constructor(public adminSevice: AdminService,
     private afAuth: AngularFireAuth, private userService: UserService,
     private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user =>{
      this.user1=user;
    })
  }
  
  logout(){
    this.firebaseService.logOut();
  }
}
