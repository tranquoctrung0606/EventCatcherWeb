import { Component, OnInit } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../services/user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
user: User = new User();
cpassword: string =""
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
  }
  newUser(){
    this.user=new User();
    this.save()
  }
  save(){
    this.userService.createUser(this.user);
    this.user=new User();
  }
 
  signup(){
      if(this.user.password!==this.cpassword){
      alert("Password don't match")
    }
    else{
      alert("successful sign up")
      this.save()
      this.router.navigate(['create-event'])
    }
    
  }
   // username: string =""
  // password: string=""
  // cpassword: string=""
  // async signup(){
  //   const {username, password, cpassword}=this
  //   if(password!== cpassword){
  //     alert("Password don't match")
  //   }
  //   try {
  //     const res= await this.afAuth.createUserWithEmailAndPassword(username, password)
  //     alert("Success")
  //   } catch (err) {
  //     alert("Error")
  //   }
  // }
  

}
