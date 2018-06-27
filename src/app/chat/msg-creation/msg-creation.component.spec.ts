import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MsgCreationComponent } from './msg-creation.component';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { User } from '../user.model';

describe('MsgCreationComponent', () => {
  let component: MsgCreationComponent;
  let fixture: ComponentFixture<MsgCreationComponent>;
  let debugElement: DebugElement;

  const fakeChatService = {
    messages: [],
    sendMessage: (msg) => {
      fakeChatService.messages.push(msg);
    },
    getMessages: () => {
      return fakeChatService.messages;
    }
  };

  const user = new User('1', 'avatar', 'username');
  const fakeUserService = {
    user: null,
    getUser: () => {
      if (!fakeUserService.user) {
        fakeUserService.user = user;
      }
      return fakeUserService.user;
    },
    setUsername: (username) => {
      if (fakeUserService.user) {
        fakeUserService.user.username = username;
      }
    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MsgCreationComponent],
      providers: [
        { provide: ChatService, useValue: fakeChatService },
        { provide: UserService, useValue: fakeUserService },
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgCreationComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should get user on init', () => {
    component.ngOnInit();
    expect(component.user).toEqual(user);
  });

  it('should get same user on second init', () => {
    component.ngOnInit();
    expect(component.user).toEqual(user);
  });

  it('should change user username', () => {
    const newUsername = 'salimTuama';
    component.user.username = newUsername;
    component.onChangeUsername();
    component.ngOnInit();
    expect(component.user.username).toEqual(newUsername);
  });

});
