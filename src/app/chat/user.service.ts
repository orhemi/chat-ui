import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { User } from './user.model';

@Injectable()
export class UserService {
  private user;
  private avatars = [
    'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
    'https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png',
    'https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png',
    'https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png',
    'https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png',
  ];

  constructor() {
  }

  private generateAvatar() {
    return this.avatars[Math.floor(Math.random() * this.avatars.length)];
  }

  private createUser() {
    const avatar = this.generateAvatar();
    return new User(uuid(), avatar, '');
  }

  getUser() {
    if (this.user) {
      return this.user;
    }

    const stringUser = localStorage.getItem('user');
    if (stringUser) {
      this.user = JSON.parse(stringUser);

    } else {
      this.user = this.createUser();
      localStorage.setItem('user', JSON.stringify(this.user));
    }

    return this.user;
  }


  setUsername(username: string) {
    if (this.user) {
      this.user.username = username;
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }
}
