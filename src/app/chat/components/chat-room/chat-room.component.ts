import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ChatRoomModel} from '../../chat-room.model';
import {Subscription} from 'rxjs/Subscription';
import {UserModel} from '../../../user/user-model';
import {ChatService} from '../../services/chat.service';
import {ChatMessageModel} from '../../../chat-message.model';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  chatMessages = '';
  chatMessage: string;
  chatRooms$: Observable<ChatRoomModel[]>;
  selectedChatRoom: ChatRoomModel;
  user: UserModel;
  userSub: Subscription;
  chatMessageSub: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatRooms$ = this.store.select(fromRoot.getChatRooms);
    this.userSub = this.store.select(fromRoot.getUser)
      .subscribe((user: UserModel) => {
        this.user = user;
      });

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  /**
   * New chat room selected
   *
   */
  onSelectChatRoom() {
    console.log('new chatRoom', this.selectedChatRoom);
  }

  onMessageKey(evt$) {
    if (evt$.keyCode === 13) {
      this.chatMessages += '\n' + this.user.name +
        ': ' + this.chatMessage;
      this.chatService.sendMessage(this.selectedChatRoom,
        this.chatMessage, this.user.name);
      this.chatMessage = '';
    }

  }


}
