import { Component, Input } from '@angular/core';

import { Message } from '../../message.model';

@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.css']
})
export class ChatMsgComponent {
  @Input() message: Message;
}
