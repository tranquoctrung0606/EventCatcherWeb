import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../services/user.model';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { Organizer } from '../services/organizer.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string=""
  password: string=""
  userRef: AngularFirestoreCollection<User> = null;
  firestoreData: Observable<User[]>;
  dataPath = '/users';
  constructor(public afAuth: AngularFireAuth, public router: Router, private db: AngularFirestore,
    private US: UserService) { }
  //user: User = new User();
  organizer: Organizer = new Organizer();
  ngOnInit() {
    
  }
//   async login(){
//     const {username, password} =this
//     try {
//       this.afAuth.signInWithEmailAndPassword(username, password).then(result => {
//         // Get user tu firestore
//       //   this.firestoreData = this.US.getCollection(this.dataPath)
//       //   this.firestoreData.subscribe(firestoreData => {
//       // } );
//       if(result.user.uid=='n14lflUwsYg4IT8uMNtP0t6M53X2'){
//         this.router.navigate(['admin'])
//       }
//       else{
//         this.router.navigate(['create-event'])
//       }
//         // Check Role   
//       }).catch(err => {
//         console.error(err)
//       })
//       // Login rồi mới get user
//     } catch (error) {
//       console.dir(error)
//       }
//   }
// }
// this.afAuth.authState.subscribe( user => {
//   if (user) { this.user.uid = user.uid
//    console.log("uid   "+this.user.uid)
//  }
//  });
async login(){
  const {username, password} =this
  try {
    this.afAuth.signInWithEmailAndPassword(username, password).then(result => {
      // Get user tu firestore
    //   this.firestoreData = this.US.getCollection(this.dataPath)
    //   this.firestoreData.subscribe(firestoreData => {
    // } );
    if(result.user.uid=='n14lflUwsYg4IT8uMNtP0t6M53X2'){
      this.router.navigate(['admin'])
    }
    else{
      this.router.navigate(['create-event'])
    }
      // Check Role   
    }).catch(err => {
      console.error(err)
    })
    // Login rồi mới get user
  } catch (error) {
    console.dir(error)
    }
}
}