import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../services/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string=""
  password: string=""
  constructor(public afAuth: AngularFireAuth, public router: Router) { }
  user: User = new User();
  ngOnInit() {
    
  }
  async login(){
    const {username, password} =this
    try {
      this.afAuth.signInWithEmailAndPassword(username, password).then(result => {
        // Get user tu firestore
        result.user.uid // <-  Lucs sign Up l
        // Check Role
        if(this.user.roles='1'){
          this.router.navigate(['organizer']); 
          }
          else {
            this.router.navigate(['create-event']); 
          }
      }).catch(err => {
        console.error(err)
      })
      // Login rồi mới get user
    } catch (error) {
      console.dir(error)
      }
  }
}
