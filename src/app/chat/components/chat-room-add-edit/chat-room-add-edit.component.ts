import { Component, OnInit } from '@angular/core';
import {ChatRoomModel} from '../../models/chat-room.model';

@Component({
  selector: 'app-chat-room-add-edit',
  templateUrl: './chat-room-add-edit.component.html',
  styleUrls: ['./chat-room-add-edit.component.css']
})
export class ChatRoomAddEditComponent implements OnInit {
  chatRoom: ChatRoomModel = {
    name: ''
  };
  constructor() { }

  ngOnInit() {
  }

}
