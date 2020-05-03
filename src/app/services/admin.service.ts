import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { User1 } from '../services/user';
import {Observable} from 'rxjs/Observable'
import { User } from './user.model';
import { Organizer1 } from './organizer';
import { Organizer } from './Organizer.model';
import { Event1 } from './event';
import { Event } from './event.model';
import { map } from 'rxjs/operators';
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
eventCollection: AngularFirestoreCollection<Event1>
event: Observable<Event1[]>;
event1: Event;
constructor(public afs: AngularFirestore,private db: AngularFirestore) { 
  this.organizer = afs.collection('organizer').valueChanges();
  this.event= afs.collection('event').valueChanges();
}
getOrganizer(){
  return this.organizer;
}
getEvent(){
  return this.event
}
getCollectionRef(path: string, sortBy?: string): 
AngularFirestoreCollection {
  if (sortBy === undefined) {
    return this.db.collection(path);
  } else {
    return this.db.collection(path, ref => ref.orderBy(sortBy));
  }
}
getCollectionSnapshot(path: string, sortBy?: string): Observable<any[]> {
  return this.getCollectionRef(path, sortBy).snapshotChanges();
}
getCollection(path: string, sortBy?: string) : Observable<any[]> {
  return this.getCollectionSnapshot(path, sortBy).pipe(
    map(changes => {
      return changes.map(change => {
        const data = change.payload.doc.data();
        const id = change.payload.doc.id;
        return { id, ...data };
      });
    }))
}
}
