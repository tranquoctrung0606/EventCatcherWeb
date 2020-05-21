import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { User1 } from '../services/user';
import {Observable} from 'rxjs/Observable'
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class Admin1Service {
UserCollection: AngularFirestoreCollection<User1>;
user: Observable<User1[]>;
user1: User;
constructor(public afs: AngularFirestore) { 
  this.user = afs.collection('users').valueChanges();
}
getOrganizer(){
  return this.user;
}
}
