import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public zoom: number;
  public lat: number;
  public long: number;
  public latlongs: any = [] ;
  public latlong: any = {};
  public searchControl: FormControl;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.zoom = 8;
    this.lat = 39.8282;
    this.lat = -98.5795;

    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [],
        componentRestrictions: {'country': 'VN'}
      });

      autocomplete.addListener('place_changed',() => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry == undefined || place.geometry == null ){
            return;
          }

          const latlong = {
            lat: place.geometry.location.lat,
            long: place.geometry.location.lng
          };

          this.latlongs.push(latlong);
          this.searchControl.reset();
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

}
