import { async, TestBed } from '@angular/core/testing';
import { Socket } from 'ng-socket-io';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/take';

import { ChatService } from './chat.service';
import { UserService } from './user.service';
import { Message } from './message.model';

describe('ChatService', () => {
  const message1 = new Message('123', 'avatar', 'username', 'text');
  const message2 = new Message('456', 'avatar2', 'username2', 'text');

  const fakeSocket = {
    msgChange: new Subject(),
    emit: function (eventName, msg) {
      this.msgChange.next(msg);
    },
    fromEvent: function (eventName) {
      return this.msgChange;
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatService,
        { provide: Socket, useValue: fakeSocket },
        UserService
      ]
    });
  });

  it('should get 1 message and then 2 messages', async(() => {
    const chatService = TestBed.get(ChatService);

    chatService.getMessages().take(1).subscribe((messages => {
      expect(messages).toEqual([message1]);
    }));

    chatService.sendMessage(message1);

    chatService.getMessages().take(1).subscribe((messages => {
      expect(messages).toEqual([message1, message2]);
    }));

    chatService.sendMessage(message2);

  }));
});
