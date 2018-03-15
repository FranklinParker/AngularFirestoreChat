import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMainComponent } from './components/chat-main/chat-main.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ChatMainComponent],
  exports: [
    ChatMainComponent
  ]
})
export class ChatModule { }
