import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {Observable} from 'rxjs/Observable';
import {ChatRoomModel} from '../../models/chat-room.model';
import * as fromRoot from '../../../app.reducer';
import {Store} from '@ngrx/store';
import {PrivateMessage} from '../../models/private-message';


@Component({
  selector: 'app-chat-main',
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.css']
})
export class ChatMainComponent implements OnInit {

  constructor(private chatService: ChatService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.chatService.getChatRooms();
    this.store.select(fromRoot.getPrivateMessagesNew)
      .subscribe((privateMessages: PrivateMessage[]) => {
        console.log('Got new private messages', privateMessages);
      });
  }

}
