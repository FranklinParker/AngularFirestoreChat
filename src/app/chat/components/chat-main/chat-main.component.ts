import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.css']
})
export class ChatMainComponent implements OnInit {
  chatMessages = '';
  chatMessage: string;

  constructor() {
  }

  ngOnInit() {
  }

  onMessageKey(evt$) {
    if (evt$.keyCode === 13) {
      this.chatMessages += '\n' + this.chatMessage;
      this.chatMessage = '';
    }

  }

}
