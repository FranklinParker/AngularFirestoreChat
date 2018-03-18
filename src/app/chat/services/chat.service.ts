import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {UiService} from '../../shared/service/ui.service';
import {ChatRoomModel} from '../chat-room.model';
import * as fromRoot from '../../app.reducer';
import {SetChatRooms} from '../chat.actions';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ChatMessageModel} from '../../chat-message.model';

@Injectable()
export class ChatService {
  fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore,
              private uiService: UiService,
              private store: Store<fromRoot.State>) {

  }

  /**
   * loads chat rooms
   *
   */
  getChatRooms() {
    this.fbSubs.push(
      this.db.collection('chatRooms')
        .snapshotChanges()
        .map(docArray => {
          // throw(new Error());
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              owner: {
                name: doc.payload.doc.data().owner.name,
                email: doc.payload.doc.data().owner.email
              }
            };
          });
        })
        .subscribe(
          (chatRooms: ChatRoomModel[]) => {
            this.store.dispatch(new SetChatRooms(chatRooms));

          },
          error => {
            this.uiService.showSnackbar(
              'Chat Room Load Error',
              null,
              3000
            );
          }
        )
    );
  }

  /**
   *
   *
   *
   * @param {ChatRoomModel} chatRoom
   * @returns {Observable<any>}
   */
  getChatRoomMessages(chatRoom: ChatRoomModel): Observable<ChatMessageModel[]> {
    return this.db
      .collection('chatRooms/' + chatRoom.id + '/messages')
      .snapshotChanges()
      .map(docArray => {
        // throw(new Error());
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            message: doc.payload.doc.data().message

          };
        });
      });
  }

  /**
   * send a message to a chatRoom
   *
   *
   * @param {ChatRoomModel} chatRoom
   * @param {ChatMessageModel} chatMessage
   */
  sendMessage(chatRoom: ChatRoomModel, message: string, senderName: string) {
    return this.db
      .collection('chatRooms/' + chatRoom.id + '/messages')
      .add({
        name: senderName,
        message: message
      });

  }

  unsubScribe() {
    this.fbSubs.forEach((sub: Subscription) => sub.unsubscribe());
  }


}
