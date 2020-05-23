import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Organizer } from './services/organizer.model';
import { Organizer1 } from './services/organizer';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private dbPath = '/organizer';
  organiserRef: AngularFirestoreCollection<Organizer> = null;
  organizerDoc;

  constructor(private ngZone: NgZone, private afAuth: AngularFireAuth, private firestore: AngularFirestore , private router: Router) {
    this.organiserRef = firestore.collection(this.dbPath);
  }

  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);
  

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }



  signUp(email:string, password:string, cpassword:string, fullname:string, address:string, contact:string ){
  
    this.afAuth.createUserWithEmailAndPassword(email, password)
     .then((result)=>{
       // add the user to the "users" database
       let user = {
        id: result.user.uid,
        email: result.user.email,
        password: password,
        fullname: fullname,
        address: address,
        contact: contact,
        role: "user",
       }
       //add the user to the database
       this.firestore.collection("organizer").add(user)
       .then(user => {
        user.get().then(x => {
          //return the user data
          console.log(x.data());
          this.currentUser = x.data();
          this.setUserStatus(this.currentUser);
          this.router.navigate(["/"]);
        })
       }).catch(err => {
         console.log(err);
       })
       
      
     })
     .catch((err)=>{
        console.log("An error ocurred: ", err);
     })
 
    }

    login(email: string, password: string) {
      
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user)=>{
        this.firestore.collection("organizer").ref.where("username", "==", user.user.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            console.log("userRef", userRef.data());
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser)
            if(userRef.data().role !== "admin") {
              this.router.navigate(["organizer/eventmanage"]);
            }else{
              this.router.navigate(["/admin"]);
            }
          })
        })
       
      }).catch(err => err)
  }

  logOut(){
    this.afAuth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      //set current user to null to be logged out
      this.currentUser = null;
      //set the listenener to be null, for the UI to react
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["/login"]));

    }).catch((err) => {
      console.log(err);
    })
  }


  userChanges(){
    this.afAuth.onAuthStateChanged(currentUser => {
      if(currentUser){
        this.firestore.collection("organizer").ref.where("username", "==", currentUser.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser);
            console.log(this.userStatus)
            
            if(userRef.data().role !== "admin") {
             this.ngZone.run(() => this.router.navigate(["organizer/eventmanage"]));
            }else{
             this.ngZone.run(() => this.router.navigate(["/admin"])); 
            }
          })
        })
      }else{
        //this is the error you where looking at the video that I wasn't able to fix
        //the function is running on refresh so its checking if the user is logged in or not
        //hence the redirect to the login
        this.ngZone.run(() => this.router.navigate(["/login"]));
      }
    })
  }

}
