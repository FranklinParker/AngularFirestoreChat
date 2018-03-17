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

  chatRooms$: Observable<ChatRoomModel[]>;
  constructor(private chatService: ChatService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.chatRooms$ = this.store.select(fromRoot.getChatRooms);
    this.chatService.getChatRooms();
  }

}
