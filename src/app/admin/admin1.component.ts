import { Component, OnInit } from '@angular/core';
import { User1 } from '../services/user';
import { Admin1Service } from '../services/admin1.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';
 
@Component({
    selector: 'app-admin-usermanagement',
    templateUrl: './admin-usermanagement.component.html',
    //styleUrls: ['./admin-usermanagement.component.scss']
})
export class AdminUsermanagementComponent implements OnInit {
user1: User1[];
editingUser: User1;
editing: boolean=false;
  constructor( private firebaseService: FirebaseService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user =>{
      this.user1=user;
    })
  }
  deleteUser(key: string){
    this.userService.deleteUser(key);
    }
  edit1(event, user){
    this.editingUser=user;
    this.editing=!this.editing;
  }
  updateUser(){
    this.userService.updateUser(this.editingUser);
    this.editingUser={} as User1;
    this.editing=false;
  }
  logout(){
    this.firebaseService.logOut();
  }
}
