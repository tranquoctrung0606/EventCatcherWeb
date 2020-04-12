import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }
  username: string =""
  password: string=""
  cpassword: string=""
  ngOnInit(): void {
  }
  async signup(){
    const {username, password, cpassword}=this
    if(password!== cpassword){
      alert("Password don't match")
    }
    try {
      const res= await this.afAuth.createUserWithEmailAndPassword(username, password)
      alert("Success")
    } catch (err) {
      alert("Error")
    }
  }
}
