import { OrganizerService } from '../services/organizer.service'
import { Organizer1 } from '../services/organizer';
//import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Component, OnInit, ElementRef, NgZone, Inject } from '@angular/core';
import { } from 'googlemaps';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { EventService } from '../event.service';
import { Event } from '../services/event.model';
import { Event1 } from '../services/event';
import { Category } from '../category.enum';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  organizerEvent: Event1[];

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
  constructor(public organizerSevice: OrganizerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private eventService: EventService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.organizerSevice.getOrganizerEvent().subscribe(organizerEvent => {
      this.event1 = organizerEvent;
    })
    

    this.zoom = 8;
    this.lat = 16.0078674;
    this.long = 108.2105099;

    this.searchControl = new FormControl();
    this.setCurrentPosition();


    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
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
        });
      });
    });
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
  creater() {
    this.save()
  }

  onEdit(key: string, record: string) {

  }

  event1: Event1[];
  editingEvent: Event1;
  editing: boolean = false;
  edit(event, event1) {
    this.editingEvent = event1;
    this.editing = !this.editing;
  }
  updateEvent() {
    this.eventService.updateEvent(this.editingEvent);
    this.editingEvent = {} as Event1;
    this.editing = false;
  }
  parseValue(value: Category) {
    this.category = value;
  }
  downloadURL: Observable<string>;
  fb;

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
}
