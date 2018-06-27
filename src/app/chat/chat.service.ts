import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { map } from 'rxjs/operators';

import { Message } from './message.model';
import { UserService } from './user.service';
import { User } from './user.model';

@Injectable()
export class ChatService {
  private wsEventName = 'spotim/chat';
  private messages: Message[] = [];
  private currentUser: User;

  constructor(private userService: UserService,
              private socket: Socket) {
    this.currentUser = this.userService.getUser();
  }

  sendMessage(message: Message) {
    this.socket.emit(this.wsEventName, message);
  }

  getMessages(): Observable<Message[]> {
    return this.socket.fromEvent(this.wsEventName).pipe(
      map((msg: Message) => {
        msg.isMyMessage = msg.userId === this.currentUser.id;
        this.messages.push(msg);
        return this.messages;
      }));
  }

  disconnect() {
    this.socket.disconnect();
  }
}
