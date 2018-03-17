import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMainComponent } from './components/chat-main/chat-main.component';
import {SharedModule} from '../shared/shared.module';
import {AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';
import {ChatService} from './services/chat.service';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import {MaterialModule} from '../material.module';
import { ChatRoomAddEditComponent } from './components/chat-room-add-edit/chat-room-add-edit.component';

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
    ChatRoomAddEditComponent],
  exports: [
    ChatMainComponent
  ]
})
export class ChatModule { }
