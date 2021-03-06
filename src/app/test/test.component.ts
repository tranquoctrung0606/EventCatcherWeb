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
  private geoCoder;
  public address: string;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.zoom = 8;
    this.lat = 16.0078674;
    this.long = 108.2105099;

    this.searchControl = new FormControl();
    this.setCurrentPosition();
    this.geoCoder = new google.maps.Geocoder;

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
            lat: place.geometry.location.lat(),
            long: place.geometry.location.lng()
          };

          this.latlongs.push(latlong);
          //this.searchControl.reset();
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

  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     console.log(results);
  //     console.log(status);
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
 
  //   });
  // }

}
