import { Component, OnInit } from '@angular/core';
import { User } from '../services/user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Organizer } from '../services/organizer.model';
import { OrganizerService } from '../organizer.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  organizer: Organizer = new Organizer();
  cpassword: string =""
  constructor(private userService: UserService,
  private router : Router,  
  private db: AngularFirestore, 
  private auth: AngularFireAuth,
  private organizerServire: OrganizerService) { }
  ngOnInit(): void {
  }

  newOrganizer(){
    this.organizer=new Organizer();
    this.save()
  }

  save(){
    //this.userService.createUser(this.user);
    this.organizerServire.createOrganizer(this.organizer);
    //this.user=new User();
    this.organizer= new Organizer();
  }
   async signup(){
      if(this.organizer.password!==this.cpassword){
      alert("Password don't match")
    }
    else{
      alert("Successful sign up")
      this.organizer.role="1";
      this.save();
      this.router.navigate(['/login'])
    }
    
  }
   // username: string =""
  // password: string=""
  // cpassword: string=""
  // async signup(){
  //   const {username, password, cpassword}=this
  //   if(password!== cpassword){
  //     alert("Password don't match")
  //   }
  //   try {
  //     const res= await this.afAuth.createUserWithEmailAndPassword(username, password)
  //     alert("Success")
  //   } catch (err) {
  //     alert("Error")
  //   }
  // }
  

}
