import { Router } from '@angular/router';
import { WebService } from '../../services/web.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  form;
  user = {
    firstname: '',
    lastname: ''
  };

  constructor(private fb: FormBuilder, private webService: WebService, private router: Router) {
    this.form = fb.group({
      firstname: ['', Validators.required],
      lastname: ['']
    });
   }

  ngOnInit() {
    this.webService.getUser().subscribe(userdata => {
      console.log('user' + JSON.stringify(userdata, undefined, 2));
      this.user.firstname = userdata.firstName;
      this.user.lastname = userdata.lastName;
    });
  }

  onSubmit() {
    console.log('submitting');
    this.webService.postUser(this.form.value).subscribe(user => {
      this.router.navigate(['/']);
    });
  }

  isValid(control) {
    return this.form.controls[control].invalid &&  this.form.controls[control].touched;
  }
}
