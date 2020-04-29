import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import { } from 'googlemaps';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { EventService } from '../event.service';
import { Event } from '../services/event.model';
import * as moment from 'moment';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Category } from '../category.enum';
import { User } from '../services/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public zoom: number;
  public lat: number;
  public long: number;
  public latlongs: any = [] ;
  public latlong: any = {};
  public searchControl: FormControl;
  public geoCoder;
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

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
     private eventService: EventService,
     private storage: AngularFireStorage,
     private afs: AngularFirestore,
     public afAuth: AngularFireAuth) { }
     user: User = new User();
     event: Event= new Event();
     uploadPercent: Observable<number>;
    downloadURL: Observable<string>;
    fb;
  ngOnInit(): void {
    this.zoom = 8;
    this.lat = 16.0078674;
    this.long = 108.2105099;

    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        //types: ["address"],
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
          this.getAddress(this.lat,this.long);
        });
      });
    });
    //set catagory values
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

  parseValue(value : Category) {
    this.category = value;
  }
  newEvent(){
    this.event=new Event();
    this.save()
  }
  save(){
    this.eventService.createEvent(this.event)
       this.event=new Event();
  }
 
  upload(event){
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
  randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
  creater(){
    if(this.event.name==null || this.event.description==null|| this.event.category==null|| this.event.image==null || this.event.startDate==null || this.event.endDate==null){
      alert("Values of form not null")
    }else{
    alert("successful")
    this.event.endDate = moment(this.event.endDate).toDate();
    this.event.startDate=moment(this.event.startDate).toDate();
    this.event.locationLat=this.lat;
    this.event.locationLng=this.long;
    this.event.location=this.address;
     this.afAuth.authState.subscribe( user => {
 if (user) { this.user.uid = user.uid
  console.log("uid   "+this.user.uid)
  this.event.hostId=user.uid;
  this.event.hostName=user.email
 }
 });
    //this.afs.collection('event', ref => ref.where('hostID', '==', 'large'))
    //this.event.hostId='xOeHBq6Fm9PlCf35sNcUhzFR2hg2';
    this.event.image=this.fb
    this.event.id=this.randomString(10)
    this.save()
  }
  }
}
