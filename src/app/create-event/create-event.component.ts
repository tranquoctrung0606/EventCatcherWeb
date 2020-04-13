import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import { } from 'googlemaps';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { EventService } from '../event.service';
import { Event } from '../services/event.model';

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
  public geoCoder
  public address: string;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private eventService: EventService) { }

  ngOnInit(): void {
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
}
