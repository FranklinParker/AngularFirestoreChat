import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {UiService} from '../../shared/service/ui.service';
import {ChatRoomModel} from '../chat-room.model';

@Injectable()
export class ChatService {
  fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore,
              private uiService: UiService) {

  }

  getChatRooms() {
    this.fbSubs.push(
      this.db.collection('chatRooms')
        .snapshotChanges()
        .map(docArray => {
          // throw(new Error());
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name
            };
          });
        })
        .subscribe(
          (chatRooms: ChatRoomModel[]) => {
            console.log('chat rooms', chatRooms);
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

  unsubScribe() {
    this.fbSubs.forEach((sub: Subscription) => sub.unsubscribe());
  }


}
