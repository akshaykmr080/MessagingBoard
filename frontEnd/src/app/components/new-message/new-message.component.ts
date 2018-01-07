import { AuthService } from '../../services/auth.service';
import { tryCatch } from 'rxjs/util/tryCatch';
import { WebService } from './../../services/web.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent {

  message = {
    owner: this.auth.name,
    message: ''
  };
  constructor(private webService: WebService, private auth: AuthService) { }

  async post() {
    this.webService.postMessage(this.message);
  }
}
