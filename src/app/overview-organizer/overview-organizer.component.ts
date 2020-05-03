import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-organizer',
  templateUrl: './overview-organizer.component.html',
  styleUrls: ['./overview-organizer.component.scss']
})
export class OverviewOrganizerComponent implements OnInit {
// Path to firebase node
data = '/data'
 
//Chart heading
label = 'My Dataset'

//Chart type
type = 'line'

//Chart color
color = '#3cba9f'
  constructor() { }

  ngOnInit(): void {
  }

}
