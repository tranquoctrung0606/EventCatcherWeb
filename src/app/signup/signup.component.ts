import { Component, OnInit } from '@angular/core';
import { User } from '../services/user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
user: User = new User();
cpassword: string =""
  constructor(private userService: UserService, private router: Router, private afAuth: AngularFireAuth) { }
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
 
   async signup(){
      if(this.user.password!==this.cpassword){
      alert("Password don't match")
    }
    else{
      alert("successful sign up")
      this.user.roles="1";
      this.save()
      this.router.navigate(['login'])
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
