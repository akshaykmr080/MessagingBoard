import { AuthService } from './../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;
  invalidLogin = false;
  constructor(private fb: FormBuilder, private auth: AuthService) {

    this.form = fb.group({
      email: ['', [Validators.required, emailValid()]],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    this.invalidLogin = false;
    this.auth.login(this.form.value).subscribe(res => {
      console.log('Login done');
      if (!res) {
        this.invalidLogin = true;
      }
    });


  }

  isValid(control) {
    return this.form.controls[control].invalid &&  this.form.controls[control].touched;
  }
}


function emailValid() {
  return control => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(control.value) ? null : { invalidEmail : true}
  };
}
