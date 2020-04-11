import { Component, OnInit } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string=""
  password: string=""
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }
   async login(){
    const {username, password} =this
    try {
      const  res= await this.afAuth.signInWithEmailAndPassword(username +'@gmail.com', password)
      console.dir(res)
    } catch (error) {
      console.dir(error)
     
    }
  }
}
