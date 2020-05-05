import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 
  create_NewStudent(record) {
    return this.firestore.collection('event').add(record);
  }
 
  read_Students() {
    return this.firestore.collection('event').snapshotChanges();
  }
 
  update_Student(recordID,record){
    this.firestore.doc('event/' + recordID).update(record);
  }
 
  delete_Student(record_id) {
    this.firestore.doc('event/' + record_id).delete();
  }
}