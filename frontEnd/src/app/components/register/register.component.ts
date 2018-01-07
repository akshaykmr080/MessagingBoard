import { AuthService } from './../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  form;
  constructor(private fb: FormBuilder, private auth: AuthService) {

    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, emailValid()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    } , { validator: matchingFields( 'password', 'confirmPassword')});

  }

  onSubmit() {
    //console.log(this.form);
    this.auth.register(this.form.value)
  }

  isValid(control) {
    return this.form.controls[control].invalid &&  this.form.controls[control].touched;
  }
}

function matchingFields(field1, field2) {
  return form => {
    if ( form.controls[field1].value !== form.controls[field2].value) {
      return { mismatchedFields: true }
    }
  };
}

function emailValid(){
  return control => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(control.value) ? null : { invalidEmail : true}
  }
}