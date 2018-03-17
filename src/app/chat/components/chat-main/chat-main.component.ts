import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {Observable} from 'rxjs/Observable';
import {ChatRoomModel} from '../../chat-room.model';
import * as fromRoot from '../../../app.reducer';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.css']
})
export class ChatMainComponent implements OnInit {
  chatMessages = '';
  chatMessage: string;
  chatRooms$: Observable<ChatRoomModel[]>;

  constructor(private chatService: ChatService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.chatRooms$ = this.store.select(fromRoot.getChatRooms);
    this.chatRooms$
      .subscribe((chatRooms: ChatRoomModel[]) => {
        console.log('chatRooms:', chatRooms);
      });
    this.chatService.getChatRooms();

  }

  onMessageKey(evt$) {
    if (evt$.keyCode === 13) {
      this.chatMessages += '\n' + this.chatMessage;
      this.chatMessage = '';
    }

  }

}
