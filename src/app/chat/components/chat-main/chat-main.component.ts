import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {Observable} from 'rxjs/Observable';
import {ChatRoomModel} from '../../models/chat-room.model';
import * as fromRoot from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {PrivateMessage} from '../../models/private-message';
import {PrivateMessageChatRoom} from '../../models/private-message-chat-room';


@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.css']
})
export class ChatMainComponent implements OnInit {

  privateMessageChatRooms: PrivateMessageChatRoom[] = [];

  constructor(private chatService: ChatService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.chatService.getChatRooms();
    this.store.select(fromRoot.getPrivateMessagesNew)
      .subscribe((privateMessages: PrivateMessage[]) => {
        console.log('Got new private messages', privateMessages);
        this.addMessages(privateMessages);
      });
  }

  /**
   * add private messages
   *
   */
  addMessages(privateMessages: PrivateMessage[]) {
    privateMessages.forEach((privateMessage: PrivateMessage) => {
      this.addPrivateMessage(privateMessage);
    });

  }

  /**
   *
   *
   *
   * @param {PrivateMessage} privateMessage
   */
  addPrivateMessage(privateMessage: PrivateMessage) {
    let privateMessageChatRoom: PrivateMessageChatRoom
      = this.privateMessageChatRooms.find((privateMessChatRoom: PrivateMessageChatRoom) =>
      privateMessChatRoom.sender.id === privateMessage.sender.id
    );
    console.log('privateMessageChatRoom', privateMessageChatRoom);
    if (!privateMessageChatRoom) {
      privateMessageChatRoom = {
        sender: privateMessage.sender,
        privateMessages: [{
          message: privateMessage.message,
          messageId: privateMessage.id,
          read: false
        }]
      };
      this.privateMessageChatRooms.push(privateMessageChatRoom);
    } else {
      privateMessageChatRoom.privateMessages.push({
        message: privateMessage.message,
        messageId: privateMessage.id,
        read: false
      });
    }
  }

}
