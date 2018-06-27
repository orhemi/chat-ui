import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ChatService } from '../chat.service';
import { Message } from '../message.model';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-msg-creation',
  templateUrl: './msg-creation.component.html',
  styleUrls: ['./msg-creation.component.css']
})
export class MsgCreationComponent implements OnInit {
  user: User;
  msg = '';

  constructor(private chatService: ChatService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  onChangeUsername() {
    this.userService.setUsername(this.user.username);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const msg = new Message(this.user.id, this.user.avatar, this.user.username, this.msg);
    this.chatService.sendMessage(msg);
    this.msg = '';
  }
}
