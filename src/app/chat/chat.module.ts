import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatMainComponent} from './components/chat-main/chat-main.component';
import {SharedModule} from '../shared/shared.module';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {ChatRoomComponent} from './components/chat-room/chat-room.component';
import {MaterialModule} from '../material.module';
import {ChatRoomAddEditComponent} from './components/chat-room-add-edit/chat-room-add-edit.component';
import {ChatMemberDialogComponent} from './components/chat-member-dialog/chat-member-dialog.component';
import {PrivateMessageService} from './services/private-message.service';
import {SendPrivateMessageService} from './services/send-private-message.service';
import { PrivateMessageMainComponent } from './components/private-message-main/private-message-main.component';
import { PrivateMessageChatComponent } from './components/private-message-chat/private-message-chat.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AngularFirestoreModule,
    MaterialModule
  ],
  declarations: [
    ChatMainComponent,
    ChatRoomComponent,
    ChatRoomAddEditComponent,
    ChatMemberDialogComponent,
    PrivateMessageMainComponent,
    PrivateMessageChatComponent
  ],
  exports: [
    ChatMainComponent
  ],
  entryComponents: [
    ChatMemberDialogComponent
  ],
  providers: [
    PrivateMessageService,
    SendPrivateMessageService
  ]

})
export class ChatModule {
}
