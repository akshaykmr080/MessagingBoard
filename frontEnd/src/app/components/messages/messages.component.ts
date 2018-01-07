import { ActivatedRoute } from '@angular/router';
import { WebService } from './../../services/web.service';
import { webSocket } from 'rxjs/observable/dom/webSocket';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  
  constructor(private webService: WebService, private route: ActivatedRoute) { }

  messages;
  async ngOnInit() {
    let name  = this.route.snapshot.params.name;
    if ( !name ) {
      this.webService.getMessages();
    } else {
      console.log(name);
      this.webService.getMessageFromUser(name);
    }
    // this.webService.messagesObservable.subscribe(messages => this.messages = messages);
  }

}
