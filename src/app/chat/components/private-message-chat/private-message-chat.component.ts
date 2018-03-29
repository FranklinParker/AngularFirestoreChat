import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-private-message-chat',
  templateUrl: './private-message-chat.component.html',
  styleUrls: ['./private-message-chat.component.css']
})
export class PrivateMessageChatComponent implements OnInit {
  @Input('privateMessageChatRoom') privateMessageChatRoom;
  constructor() { }

  ngOnInit() {
  }

}
