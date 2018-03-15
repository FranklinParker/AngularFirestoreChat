import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMainComponent } from './components/chat-main/chat-main.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChatMainComponent],
  exports: [
    ChatMainComponent
  ]
})
export class ChatModule { }
