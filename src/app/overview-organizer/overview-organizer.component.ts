import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CanvasJS from './canvasjs.min';
import { Event } from '../services/event.model';
import { Event1 } from '../services/event';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-overview-organizer',
  templateUrl: './overview-organizer.component.html',
  styleUrls: ['./overview-organizer.component.scss']
})
export class OverviewOrganizerComponent implements OnInit {

  constructor(private db: AngularFirestore,public adminSevice: AdminService) {
   }
   event1: Event1[];
   event: Event[];
   numberOfEvent;
   firestoreData: Observable<Event[]>;
   dataPath = '/event';
  ngOnInit(): void {
    // const query = this.db.collection('/event').get().toPromise();
    //     console.log(query)
    // const query = this.db.collection('/event',ref => ref.where("numMember", ">", 500)).valueChanges()
    //     .forEach(console.log)
      //   this.db.collection('event').get().toPromise().then(snap => {
      //     console.log(snap)
      //  });
    //   this.db.collection('event').get().toPromise().then(snap => {
    //     snap.forEach(doc =>{
    //       console.log(doc.id);
    //     });
    //  }).catch(error => {
    //   console.log(`error is ${error}`);
    // });
        //this.firestoreData = this.adminSevice.getCollection(this.dataPath)
      this.firestoreData.subscribe(firestoreData => {
       console.log(firestoreData)
    } );
  //      let chart = new CanvasJS.Chart("chartContainer", {
  //       animationEnabled: true,
  //       exportEnabled: true,
  //       title: {
  //         text: "Basic Column Chart in Angular"
  //       },
  //       data: [{
  //         type: "column",
  //         dataPoints: [
  //           { y: 71, label: "Apple" },
  //           { y: 55, label: "Mango" },
  //           { y: 50, label: "Orange" },
  //           { y: 65, label: "Banana" },
  //           { y: 95, label: "Pineapple" },
  //           { y: 68, label: "Pears" },
  //           { y: 28, label: "Grapes" },
  //           { y: 34, label: "Lychee" },
  //           { y: 14, label: "Jackfruit" },
  //           { y: 14, label: "Jackfruit" },
  //           { y: 14, label: "Jackfruit" },
  //           { y: 14, label: "Jackfruit" }
  //         ]
  //       }]
  //     });
        
  //     chart.render();
   }
  
}
