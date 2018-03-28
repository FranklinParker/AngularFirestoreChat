import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {UiService} from '../../shared/service/ui.service';
import {ChatRoomModel} from '../models/chat-room.model';
import * as fromRoot from '../../app.reducer';
import {SetChatRooms, SetLoggedInUsers} from '../chat.actions';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {ChatMessageModel} from '../models/chat-message.model';
import {UserModel} from '../../user/user-model';
import {LoggedInMember} from '../models/logged-in.member';

@Injectable()
export class ChatService {
  fbSubs: Subscription[] = [];
  loggedInUsersSub: Subscription;
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
              isPrivate: chatRoom.isPrivate,
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
   * add a new Chat room
   *
   * @param {ChatRoomModel} newChatRoom
   */
  addChatRoom(newChatRoom: ChatRoomModel) {
    this.db.collection('chatRooms')
      .add(newChatRoom).then((result) => {
      newChatRoom.id = result.id;
    });
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
   * when joining a chat make sure you leave any chat
   * you are in, then add yourself to the new chat room
   *
   * @param {ChatRoomModel} chatRoom
   * @param {UserModel} user
   */
  joinChatRoom(newChatRoom: ChatRoomModel, user: UserModel): Promise<ChatRoomModel> {
    return new Promise((resolve, reject) => {
      if (this.currentChatRoom) {
        this.db.doc('chatRooms/' + this.currentChatRoom.id
          + '/loggedInUsers/' +
          this.currentChatRoom.loggedInUserId).delete()
          .then(
            (result) => {
              this.addUserToChatRoom(newChatRoom, user)
                .then((chatRoom: ChatRoomModel) => {
                  resolve(newChatRoom);
                }).catch(err => reject(err));
            }
          );

      } else {
        this.addUserToChatRoom(newChatRoom, user)
          .then((chatRoom: ChatRoomModel) => {
            resolve(newChatRoom);
          }).catch(err => reject(err));
      }
    });


  }

  /**
   * get a list of logged users
   *
   *
   */
  getLoggedInUsersSubscription() {
    if (this.currentChatRoom) {
      this.loggedInUsersSub =
        this.db.collection('chatRooms/' + this.currentChatRoom.id + '/loggedInUsers')
          .snapshotChanges()
          .map(docArray => {
            // throw(new Error());
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                email: doc.payload.doc.data().email,
                userId: doc.payload.doc.data().userId
              };
            });
          })
          .subscribe((logInMembers: LoggedInMember[]) => {
              this.store.dispatch(new SetLoggedInUsers(logInMembers));
            }
          );

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
          email: user.email,
          userId: user.id
        }
      ).then((result) => {
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
    if (this.loggedInUsersSub) {
      this.loggedInUsersSub.unsubscribe();
    }
  }
}
