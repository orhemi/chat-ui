import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { HeaderComponent } from './header/header.component';
import { ChatComponent } from './chat.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';
import { MsgCreationComponent } from './msg-creation/msg-creation.component';
import { ChatMsgComponent } from './chat-history/chat-msg/chat-msg.component';
import { environment } from '../../environments/environment';

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

@NgModule({
  declarations: [
    HeaderComponent,
    ChatComponent,
    ChatHistoryComponent,
    MsgCreationComponent,
    ChatMsgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule {
}
