import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Message } from './message.model';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages$: Observable<Message[]>;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.messages$ = this.chatService.getMessages();
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }
}
