import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {ChatService} from '../../services/chat.service';
import {Observable} from 'rxjs/Observable';
import {ChatRoomModel} from '../../chat-room.model';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  chatMessages = '';
  chatMessage: string;
  chatRooms$: Observable<ChatRoomModel[]>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.chatRooms$ = this.store.select(fromRoot.getChatRooms);
    this.chatRooms$
      .subscribe((chatRooms: ChatRoomModel[]) => {
        console.log('chatRooms room:', chatRooms);
      });

  }
  onMessageKey(evt$) {
    if (evt$.keyCode === 13) {
      this.chatMessages += '\n' + this.chatMessage;
      this.chatMessage = '';
    }

  }


}
