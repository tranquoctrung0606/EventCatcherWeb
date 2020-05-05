import { OrganizerService } from '../services/organizer.service'
import { Organizer1 } from '../services/organizer';
//import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Component, OnInit, ElementRef, NgZone, Inject } from '@angular/core';
import { } from 'googlemaps';
import { Category } from '../category.enum';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { EventService } from '../event.service';
import { Event } from '../services/event.model';
import { FirebaseService } from '../firebase.service';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  organizerEvent: Organizer1[];

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public zoom: number;
  public lat: number;
  public long: number;
  public latlongs: any = [] ;
  public latlong: any = {};
  public searchControl: FormControl;
  public geoCoder
  public address: string;
  category: Category;
  listOptions : Category[] = [
    Category.Art,
    Category.Causes,
    Category.Comedy,
    Category.Crafts,
    Category.Dance,
    Category.Drinks,
    Category.Film,
    Category.Fitness,
    Category.Food,
    Category.Games,
    Category.Gardening,
    Category.Health,
    Category.Home,
    Category.Literature,
    Category.Music,
    Category.Networking,
    Category.Party,
    Category.Religion,
    Category.Shopping,
    Category.Sports,
    Category.Theater,
    Category.Wellness,
    Category.Other
  ];

  //Event Properties
  events: any;
  eventName: string;
  eventImage: string;
  eventDes: string;
  
  eventNumMember: number;
  eventLocation: string;


  constructor(public organizerSevice: OrganizerService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, 
              private eventService: EventService,
              private firebaseService: FirebaseService,
              private crudService: CrudService
              ) { }

  ngOnInit(): void {

    this.organizerSevice.getOrganizerEvent().subscribe(organizerEvent =>{
      this.organizerEvent = organizerEvent;
    })

    //Show Information on Web
    this.crudService.read_Students().subscribe(data => {
 
      this.events = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          numMember: e.payload.doc.data()['numMember'],
          location: e.payload.doc.data()['location'],
          image: e.payload.doc.data()['image']
        };
      })
       console.log(this.events);
 
    });

    this.zoom = 8;
    this.lat = 16.0078674;
    this.long = 108.2105099;

    this.searchControl = new FormControl();
    this.setCurrentPosition();
    

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
        componentRestrictions: {'country': 'VN'}
      });

      autocomplete.addListener('place_changed',() => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry == undefined || place.geometry == null ){
            return;
          }
          this.lat = place.geometry.location.lat();
          this.long = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  //Delete Event
  RemoveRecord(rowID) {
    this.crudService.delete_Student(rowID);
  }
 
  //Enable Edit Event Function to Update 
  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.name;
    record.EditNumMember = record.numMember;
    record.EditLocation = record.location;
  }

  //Update Event
  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.EditName;
    record['numMember'] = recordRow.EditNumMember;
    record['location'] = recordRow.EditLocation;
    this.crudService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.zoom = 8;
      })
    }
  }
  event: Event= new Event();
  newEvent(){
    this.event=new Event();
    this.save()
  }
  
  save(){
    this.eventService.createEvent(this.event)
    this.event=new Event();
  }
  creater(){
    this.save()
  }

  onEdit(key:string, record: string){

  }

    logout(){
    this.firebaseService.logOut();
  }

}
