import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ChatRoomModel} from '../../models/chat-room.model';
import {Subscription} from 'rxjs/Subscription';
import {UserModel} from '../../../user/user-model';
import {ChatService} from '../../services/chat.service';
import {ChatMessageModel} from '../../models/chat-message.model';

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
    this.chatRooms$.subscribe((chatRooms: ChatRoomModel[])=>{
      console.log('chatRooms recv', chatRooms);
    })
    this.store.select(fromRoot.getSelectedChatRoom)
      .subscribe((chatRoom: ChatRoomModel) => {
        this.getChatRoomMessages(chatRoom);

      });
    this.userSub = this.store.select(fromRoot.getUser)
      .subscribe((user: UserModel) => {
        this.user = user;
      });

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    if (this.chatMessageSub) {
      this.chatMessageSub.unsubscribe();
    }
  }

  /**
   * New chat room selected
   *
   *
   */
  onSelectChatRoom(chatRoom: ChatRoomModel) {
    if (chatRoom) {
      this.chatService.addLoggedInUser(chatRoom,
        this.user);

    }

  }

  getChatRoomMessages(chatRoom: ChatRoomModel) {
    if (chatRoom) {
      this.chatMessageSub = this.chatService.getChatRoomMessages(chatRoom)
        .subscribe((chatMessages: ChatMessageModel[]) => {
          this.chatMessages = '';
          chatMessages.forEach((chatMessage: ChatMessageModel) => {
            this.chatMessages += '\n' + chatMessage.name + ': '
              + chatMessage.message;
          });
        });
    }
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
