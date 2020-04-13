import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Event } from './services/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private dbPath = '/Event';
 
  eventRef: AngularFirestoreCollection<Event> = null;
 
  constructor(private db: AngularFirestore) {
    this.eventRef = db.collection(this.dbPath);
  }
  createEvent(event: Event): void {
    this.eventRef.add({...event});
  }
}
