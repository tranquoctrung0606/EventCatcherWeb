import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { User } from '../services/user';
import {Observable} from 'rxjs/Observable'
@Injectable({
  providedIn: 'root'
})
export class AdminService {
userCollection: AngularFirestoreCollection<User>;
user: Observable<User[]>;
  constructor(public afs: AngularFirestore) { 
    this.user = afs.collection('users').valueChanges();
  }
  getUser(){
    return this.user;
  }
}
