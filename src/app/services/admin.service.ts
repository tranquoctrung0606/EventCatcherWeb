import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { User1 } from '../services/user';
import {Observable} from 'rxjs/Observable'
import { User } from './user.model';
import { Organizer1 } from './organizer';
import { Organizer } from './Organizer.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
// userCollection: AngularFirestoreCollection<User1>;
// user: Observable<User1[]>;
// user1: User;
  // constructor(public afs: AngularFirestore) { 
  //   this.user = afs.collection('users').valueChanges();
  // }
  // getUser(){
  //   return this.user;
  // }

organizerCollection: AngularFirestoreCollection<Organizer1>;
organizer: Observable<Organizer1[]>;
organizer1: Organizer;
constructor(public afs: AngularFirestore) { 
  this.organizer = afs.collection('organizer').valueChanges();
}
getOrganizer(){
  return this.organizer;
}
}
