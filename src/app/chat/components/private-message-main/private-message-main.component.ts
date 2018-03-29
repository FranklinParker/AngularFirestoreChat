import { Component, OnInit, Input } from '@angular/core';
import {PrivateMessageChatRoom} from '../../models/private-message-chat-room';

@Component({
  selector: 'app-private-message-main',
  templateUrl: './private-message-main.component.html',
  styleUrls: ['./private-message-main.component.css']
})
export class PrivateMessageMainComponent implements OnInit {
  @Input('privateMessageChatRooms') privateMessageChatRooms: PrivateMessageChatRoom[] = [];
  constructor() { }

  ngOnInit() {
  }

}
