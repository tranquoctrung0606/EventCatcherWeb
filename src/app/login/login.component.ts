import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formdata

  constructor(private router: Router) { }

  ngOnInit() {
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([
         Validators.required,
         Validators.minLength(6)
      ])),
      pass: new FormControl("", this.passwordvalidation)
   });
  }

  passwordvalidation(formcontrol) {
    if (formcontrol.value.length < 5) {
       return {"pass" : true};
    }
 }
 onClickSubmit(data) {
    console.log(data.name);
    if (data.name == "admin123" && data.pass == "admin123") {
       alert("Login Successful");
       this.router.navigate(['home']);
    }
    else{
      alert("error");
    }
 }

}
