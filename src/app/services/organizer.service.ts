import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import { Organizer1 } from '../services/organizer';
import {Observable} from 'rxjs/Observable'
import { Event1 } from './event';
@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
OrganizerCollection: AngularFirestoreCollection<Event1>;
organizerGetEvent: Observable<Event1[]>;
  constructor(public afs: AngularFirestore) { 
    this.organizerGetEvent = afs.collection('event').valueChanges();
  }
  getOrganizerEvent(){
    return this.organizerGetEvent;
  }
}