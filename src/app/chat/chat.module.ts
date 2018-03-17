import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMainComponent } from './components/chat-main/chat-main.component';
import {SharedModule} from '../shared/shared.module';
import {AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';
import {ChatService} from './services/chat.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AngularFirestoreModule
  ],
  declarations: [
    ChatMainComponent],
  exports: [
    ChatMainComponent
  ]
})
export class ChatModule { }
