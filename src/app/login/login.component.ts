import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formdata
  username: string=""
  password: string=""
  constructor(public afAuth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
    
  }
   async login(){
    const {username, password} =this
    try {
      const  res= await this.afAuth.signInWithEmailAndPassword(username +'@gmail.com', password)
      console.dir(res)
      this.router.navigate(['home']);
    } catch (error) {
      console.dir(error)
     
    }
  }
}
