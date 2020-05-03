import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Event } from './services/event.model';
import { Event1 } from './services/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private dbPath = '/event';
 
  eventRef: AngularFirestoreCollection<Event> = null;
 
  constructor(private db: AngularFirestore) {
    this.eventRef = db.collection(this.dbPath);
  }
  createEvent(event: Event): void {
    this.eventRef.add({...event});
  }
  eventDoc;
  updateEvent(event:Event1){
    this.eventDoc=this.db.doc(`event/${event.uid}`);
    this.eventDoc.update(event)
  }
}
