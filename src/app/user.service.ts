import { Injectable } from '@angular/core';
import { User } from './services/user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';
 
  userRef: AngularFirestoreCollection<User> = null;
 
  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.dbPath);
  }
 
  createUser(user: User): void {
    this.userRef.add({...user});
  }
 
  updateUser(key: string, value: any): Promise<void> {
    return this.userRef.doc(key).update(value);
  }
 
  deleteUser(key: string): Promise<void> {
    return this.userRef.doc(key).delete();
  }
 
  getUserList(): AngularFirestoreCollection<User> {
    return this.userRef;
  }
 
  deleteAll() {
    this.userRef.get().subscribe(
      querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      },
      error => {
        console.log('Error: ', error);
      });
  }
}
