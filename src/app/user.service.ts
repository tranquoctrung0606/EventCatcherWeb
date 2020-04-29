import { Injectable } from '@angular/core';
import { User } from './services/user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { User1 } from './services/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users';
  userRef: AngularFirestoreCollection<User> = null;
  userDoc;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.userRef = db.collection(this.dbPath);
  }
 
  createUser(user: User): void {
    // 
    this.auth.createUserWithEmailAndPassword(user.username, user.password).then(result => {
      user.uid = result.user.uid
      this.userRef.doc(user.uid).set({...user});
    }) // Dung Method nay tao authen cho no sau do luu firestore
  }
 
  // updateUser(key: string, value: any): Promise<void> {
  //   return this.userRef.doc(key).update(value);
  // }
 
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
  updateUser(user:User1){
    this.userDoc=this.db.doc(`users/${user.uid}`);
    this.userDoc.update(user)
  }
  getCollectionRef(path: string, sortBy?: string): 
  AngularFirestoreCollection {
    if (sortBy === undefined) {
      return this.db.collection(path);
    } else {
      return this.db.collection(path, ref => ref.orderBy(sortBy));
    }
  }
  getCollectionSnapshot(
    path: string,
    sortBy?: string
  ): Observable<any[]> {
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
  getUser(id: string): Observable<User[]> {
    const productsDocuments = this.db.collection<User[]>('users');
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
