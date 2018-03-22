import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ChatRoomModel} from '../../models/chat-room.model';
import {Subscription} from 'rxjs/Subscription';
import {UserModel} from '../../../user/user-model';
import {ChatService} from '../../services/chat.service';
import {ChatMessageModel} from '../../models/chat-message.model';
import {UiService} from '../../../shared/service/ui.service';
import {LoggedInMember} from '../../models/logged-in.member';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  chatMessages = '';
  chatMessage: string;
  chatRooms$: Observable<ChatRoomModel[]>;
  loggedInMembers$: Observable<LoggedInMember[]>;
  selectedChatRoom: ChatRoomModel;
  user: UserModel;
  userSub: Subscription;
  chatMessageSub: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private chatService: ChatService,
              private uiService: UiService) {
  }

  ngOnInit() {
    this.chatRooms$ = this.store.select(fromRoot.getChatRooms);
    this.loggedInMembers$ = this.store.select(fromRoot.getLoggedInMembers);
    this.loggedInMembers$.subscribe((logInMembers: LoggedInMember[]) => {
      console.log('got logged in members', logInMembers);
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
    this.chatService.joinChatRoom(chatRoom,
      this.user)
      .then((newChatRoom: ChatRoomModel) => {
        this.chatService.getLoggedInUsersSubscription();
        this.getChatRoomMessages(newChatRoom);
      }).catch((err) => {
      this.uiService.showSnackbar('Error Enter Chat Room',
        null, 6000);
    });

  }

  /**
   *
   *
   */
  onSelectRoomToNone() {
    this.chatService.setChatRoomToNone();
    this.chatMessages = '';

  }

  /**
   * gets all messages for a chat room
   *
   * @param {ChatRoomModel} chatRoom
   */
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
