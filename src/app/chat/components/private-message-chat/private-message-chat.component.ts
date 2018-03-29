import { Component, OnInit, Input } from '@angular/core';
import {PrivateMessageChatRoom} from '../../models/private-message-chat-room';

@Component({
  selector: 'app-private-message-chat',
  templateUrl: './private-message-chat.component.html',
  styleUrls: ['./private-message-chat.component.css']
})
export class PrivateMessageChatComponent implements OnInit {
  @Input('privateMessageChatRoom') privateMessageChatRoom: PrivateMessageChatRoom;
  showMessages = true;
  constructor() { }

  ngOnInit() {
  }

}
