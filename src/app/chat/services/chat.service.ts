import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {UiService} from '../../shared/service/ui.service';
import {ChatRoomModel} from '../models/chat-room.model';
import * as fromRoot from '../../app.reducer';
import {SetChatRooms} from '../chat.actions';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ChatMessageModel} from '../models/chat-message.model';
import {UserModel} from '../../user/user-model';
import {promise} from 'selenium-webdriver';

@Injectable()
export class ChatService {
  fbSubs: Subscription[] = [];
  currentChatRoom: ChatRoomModel;

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
            const chatRoom = doc.payload.doc.data();
            return {
              id: doc.payload.doc.id,
              name: chatRoom.name,
              owner: {
                name: chatRoom.owner.name,
                email: chatRoom.owner.email
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
   * get all the messages for a chat room
   *
   *
   * @param {ChatRoomModel} chatRoom
   * @returns {Observable<any>}
   */
  getChatRoomMessages(chatRoom: ChatRoomModel): Observable<ChatMessageModel[]> {
    return this.db
      .collection('chatRooms/' + chatRoom.id + '/messages',
        ref => ref.orderBy('date'))
      .snapshotChanges()
      .map(docArray => {
        // throw(new Error());
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            message: doc.payload.doc.data().message,
            date: doc.payload.doc.data().date

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
        message: message,
        date: new Date()
      });

  }

  /**
   * set chat room to none
   *
   *
   */
  setChatRoomToNone(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.currentChatRoom) {
        this.db.collection('chatRooms/' + this.currentChatRoom.id +
          '/loggedInUsers').doc(this.currentChatRoom.loggedInUserId).delete()
          .then(() => {
            this.currentChatRoom = null;
            resolve('success');

          }).catch(err => reject('err'));

      } else {
        this.currentChatRoom = null;
        resolve('success');
      }
    });
  }


  /**
   * add logged in member
   *
   * @param {ChatRoomModel} chatRoom
   * @param {UserModel} user
   */
  joinChatRoom(newChatRoom: ChatRoomModel, user: UserModel): Promise<ChatRoomModel> {
    if (this.currentChatRoom) {
      this.db.doc('chatRooms/' + this.currentChatRoom.id
        + '/loggedInUsers/' +
        this.currentChatRoom.loggedInUserId).delete()
        .then(
          (result) => {
            return this.addUserToChatRoom(newChatRoom, user);
          }
        );

    } else {
      return this.addUserToChatRoom(newChatRoom, user);
    }

  }

  /**
   * Add user to chat room
   *
   *
   * @param {ChatRoomModel} chatRoom
   * @param {UserModel} user
   */

  private addUserToChatRoom(chatRoom: ChatRoomModel, user: UserModel): Promise<ChatRoomModel> {

    return this.db.collection('chatRooms/' + chatRoom.id + '/loggedInUsers')
      .add({
          name: user.name,
          email: user.email
        }
      ).then((result) => {
        console.log('result ', result.id);
        chatRoom.loggedInUserId = result.id;
        this.currentChatRoom = chatRoom;
        return this.currentChatRoom;
      }).catch((reject) => {
          return reject;
        }
      );

  }

  /**
   * cleanup subscriptions
   *
   */
  unsubcribe() {
    this.fbSubs.forEach(
      (sub: Subscription) => sub.unsubscribe());
  }


}
