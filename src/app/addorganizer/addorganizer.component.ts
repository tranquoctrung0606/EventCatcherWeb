import { Component, OnInit } from '@angular/core';
import { User } from '../services/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { Organizer } from '../services/organizer.model';
import { OrganizerService } from '../organizer.service';
@Component({
  selector: 'app-addorganizer',
  templateUrl: './addorganizer.component.html',
  styleUrls: ['./addorganizer.component.scss']
})
export class AddorganizerComponent implements OnInit {
  //user: User = new User();
  organizer: Organizer=new Organizer();
  constructor(private organizerServire: OrganizerService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }
  newOrganizer(){
    this.organizer=new Organizer();
    this.save()
  }
  save(){
    this.organizerServire.createOrganizer(this.organizer);
    this.organizer=new Organizer();
  }
  async createOrganizer(){
    alert("Successfull")
    this.organizer.role="1"
    this.save()
    this.router.navigate(['admin'])
  }
}
