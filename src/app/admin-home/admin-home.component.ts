import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  @Input() numberOfEvent: number;
  @Input() numberOfUser: number;
  @Input() numberOfOrganizer: number;
  constructor(private db: AngularFirestore) { 
   
  }

  ngOnInit(): void {
    this.db.collection('event').get().toPromise().then(snap => {
      this.numberOfEvent = snap.size // will return the collection size
   });
   this.db.collection('users').get().toPromise().then(snap => {
    this.numberOfUser = snap.size // will return the collection size
 });  
 this.db.collection('organizer').get().toPromise().then(snap => {
  this.numberOfOrganizer = snap.size // will return the collection size
});
  }
}
