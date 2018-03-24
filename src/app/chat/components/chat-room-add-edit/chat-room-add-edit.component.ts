import {Component, OnInit} from '@angular/core';
import {ChatRoomModel} from '../../models/chat-room.model';
import * as fromApp from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {UserModel} from '../../../user/user-model';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-room-add-edit',
  templateUrl: './chat-room-add-edit.component.html',
  styleUrls: ['./chat-room-add-edit.component.css']
})
export class ChatRoomAddEditComponent implements OnInit {
  user: UserModel;
  chatRoom: ChatRoomModel = {
    name: '',
    isPrivate: false
  };

  constructor(private store: Store<fromApp.State>,
              private chatService: ChatService) {
  }

  ngOnInit() {
    this.store.select(fromApp.getUser)
      .subscribe((user: UserModel) => {
        this.user = user;
      });
  }

  onSubmit() {
    console.log('Chat room', this.chatRoom);
    this.chatRoom.owner = {
      name: this.user.name,
      email: this.user.email
    };
    this.chatService.addChatRoom(this.chatRoom);
  }

}
