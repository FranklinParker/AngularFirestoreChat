import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.css']
})
export class ChatMainComponent implements OnInit {
  chatMessages: string = 'test \n new';
  chatMessage: string;
  constructor() { }

  ngOnInit() {
  }
  onMessageKey(evt$) {
    console.log(evt$);

  }

}
