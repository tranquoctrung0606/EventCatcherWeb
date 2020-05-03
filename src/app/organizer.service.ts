import { Injectable } from '@angular/core';
import { User } from './services/user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User1 } from './services/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organizer } from './services/organizer.model';
import { Organizer1 } from './services/organizer';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  private dbPath = '/organizer';
  organiserRef: AngularFirestoreCollection<Organizer> = null;
  organizerDoc;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.organiserRef = db.collection(this.dbPath);
  }
 
  createOrganizer(organizer: Organizer): void {
    // 
    this.auth.createUserWithEmailAndPassword(organizer.username, organizer.password).then(result => {
        organizer.uid = result.user.uid
      this.organiserRef.doc(organizer.uid).set({...organizer});
    }) // Dung Method nay tao authen cho no sau do luu firestore
  }
 
  // updateUser(key: string, value: any): Promise<void> {
  //   return this.userRef.doc(key).update(value);
  // }
 
  deleteOrganizer(key: string): Promise<void> {
    return this.organiserRef.doc(key).delete();
  }
 
  getOrganizerList(): AngularFirestoreCollection<Organizer> {
    return this.organiserRef;
  }
 
  deleteAll() {
    this.organiserRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('Error: ', error);
      });
  }
  updateOrganizer(organizer:Organizer1){
    this.organizerDoc=this.db.doc(`organizer/${organizer.uid}`);
    this.organizerDoc.update(organizer)
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
  getOrganizer(id: string): Observable<Organizer[]> {
    const productsDocuments = this.db.collection<Organizer[]>('organizer');
    return productsDocuments.snapshotChanges()
      .pipe(
        map(changes => changes.map(({ payload: { doc } }) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        })),
        map((user) => user.find(doc => doc.id === id)))
  }
}
