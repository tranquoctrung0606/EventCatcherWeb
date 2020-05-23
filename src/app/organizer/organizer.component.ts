import { OrganizerService } from '../services/organizer.service'
import { Organizer1 } from '../services/organizer';
//import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Component, OnInit, ElementRef, NgZone, Injectable, Input } from '@angular/core';
import { } from 'googlemaps';
import { Category } from '../category.enum';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { EventService } from '../event.service';
import { Event } from '../services/event.model';
import { FirebaseService } from '../firebase.service';
import { CrudService } from '../services/crud.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as moment from 'moment';
import { User } from '../services/user.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Organizer } from '../services/organizer.model';
import { HighlightPipe } from './highlight.pipe';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { tap, debounceTime, map, startWith } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

const datePipe = new DatePipe('en-US');


@Injectable({
  providedIn: 'root'
})

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
  public latlongs: any = [];
  public latlong: any = {};
  public searchControl: FormControl;
  public geoCoder
  public address: string;
  category: Category;
  listOptions: Category[] = [
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

  search: string;
  searchedItems: any[];
  highlightPipe = new HighlightPipe();
  searchValue: string = "";
  results: any;

  //Event Properties
  events: any;
  upcomingEvents: any;
  ongoingEvents: any;
  endedEvents: any;
  eventName: string;
  eventImage: string;
  eventDes: string;

  eventNumMember: number;
  eventLocation: string;

  

  @Input() OrganizerId: string;

  constructor(public organizerSevice: OrganizerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private eventService: EventService,
    private firebaseService: FirebaseService,
    private crudService: CrudService,
    public afAuth: AngularFireAuth,
    private storage: AngularFireStorage,
    public afs: AngularFirestore,
  ) { }

  ngOnInit(): void {

    this.organizerSevice.getOrganizerEvent().subscribe(organizerEvent => {
      this.organizerEvent = organizerEvent;
    })
    this.afAuth.authState.subscribe(user => {
      console.log(user.uid)
      this.OrganizerId = user.uid;
    })
    //Show Information on Web
    this.crudService.read_Students().subscribe(data => {

      this.events = data.map(e => {
        return {
          highlight: false,
          id: e.payload.doc.id,
          isEdit: false,
          hostId: e.payload.doc.data()['hostId'],
          name: e.payload.doc.data()['name'],
          numMember: e.payload.doc.data()['numMember'],
          location: e.payload.doc.data()['location'],
          image: e.payload.doc.data()['image'],
          startDate: e.payload.doc.data()['startDate'],
          endDate: e.payload.doc.data()['endDate']
        };
      })
      console.log(this.events.name);

      let a = Date.now();
      let start = new Date(a).getTime()/1000;

      this.upcomingEvents = this.events.filter(
        m => new Date(m.startDate.seconds) >= new Date(start)
        );

        this.ongoingEvents = this.events.filter(
          m => new Date(m.startDate.seconds) == new Date(start)
          );

          this.endedEvents = this.events.filter(
            m => new Date(m.startDate.seconds) <= new Date(start)
            );

      // console.log(this.upcomingEvents);

      
    });

    this.zoom = 8;
    this.lat = 16.0078674;
    this.long = 108.2105099;

    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        //types: ["address"],
        componentRestrictions: { 'country': 'VN' }
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry == undefined || place.geometry == null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.long = place.geometry.location.lng();
          this.zoom = 12;
          this.getAddress(this.lat, this.long);
        });
      });
    });
    //set catagory values
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      //console.log(results);
      //console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
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
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.zoom = 8;
      })
    }
  }

  event: Event = new Event();

  newEvent() {
    this.event = new Event();
    this.save()
  }

  save() {
    this.eventService.createEvent(this.event)
    this.event = new Event();
  }
  randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  fb;
  downloadURL: Observable<string>;
  //user: User = new User();
  organizer: Organizer = new Organizer();

  onEdit(key: string, record: string) {

  }

  logout() {
    this.firebaseService.logOut();
  }

  devicesearch(input) {
    this.search = input;
    this.searchedItems = this.highlightPipe.transform(this.events, input, true);
    // only names --> const names = this.searchedItems.map(item => item.label);
    console.log(this.searchedItems);
  }

  upload(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  parseValue(value: Category) {
    this.category = value;
  }
  
    

  creater() {
    // if (this.event.name == null || this.event.description == null 
    //   || this.event.category == null || this.event.startDate == null ||
    //     this.event.endDate == null) {
    //     alert("Values of form not null")
      
    // } else {
     
      alert("successful")
      this.event.endDate = moment(this.event.endDate).toDate();
      this.event.startDate = moment(this.event.startDate).toDate();
      this.event.locationLat = this.lat;
      this.event.locationLng = this.long;
      this.event.location = this.address;
      this.event.image = this.fb
      this.event.id = this.randomString(10)
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.organizer.uid = user.uid
          console.log("uid   " + this.organizer.uid)
          this.event.hostId = user.uid;
          this.event.hostName = user.email
          this.save()
        }
      });
    }
  }

