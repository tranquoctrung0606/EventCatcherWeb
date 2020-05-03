import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Organizer1 } from '../services/organizer';
import {Observable} from 'rxjs/Observable'
@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
OrganizerCollection: AngularFirestoreCollection<Organizer1>;
organizerGetEvent: Observable<Organizer1[]>;
  constructor(public afs: AngularFirestore) { 
    this.organizerGetEvent = afs.collection('event').valueChanges();
  }
  getOrganizerEvent(){
    return this.organizerGetEvent;
  }
}