import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoggedInMember} from '../models/logged-in.member';
import {ChatMemberDialogComponent} from '../components/chat-member-dialog/chat-member-dialog.component';
import {AngularFirestore} from 'angularfire2/firestore';
import {UserModel} from '../../user/user-model';
import {PrivateMessage} from '../models/private-message';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import {AddPrivateMessage} from '../chat.actions';


@Injectable()
export class PrivateMessageService {
  privateMessageSub: Subscription;

  constructor(private dialogService: MatDialog,
              private db: AngularFirestore,
              private store: Store<fromRoot.State>) {
  }

  /**
   * when a user is activated want to listen for his
   *  private messages
   *
   * @param {UserModel} user
   */
  userPrivateMessageSub(user: UserModel) {
    this.privateMessageSub =
      this.db.collection('users/' + user.id + '/privateMessages',
        ref => ref.where('read', '==', false))
        .snapshotChanges(['added'])
        .map(docArray => {
          return docArray.map(doc => {
            const privateMessage = doc.payload.doc.data();
            return {
              id: doc.payload.doc.id,
              message: privateMessage.message,
              sender: privateMessage.sender,
              read: privateMessage.read
            };
          });
        })
        .subscribe(
          (privateMessages: PrivateMessage[]) => {
            this.store.dispatch( new AddPrivateMessage(privateMessages));
            this.markMessageRead(privateMessages, user.id);
          },
          error => {
          }
        );
  }

  /***
   * mark private messages as read
   *
   *
   * @param {PrivateMessage[]} privateMessages
   */

  private markMessageRead(privateMessages: PrivateMessage[], userId: string) {
    privateMessages.forEach((privateMessage: PrivateMessage) => {
      this.db.doc('users/' + userId + '/privateMessages/' + privateMessage.id)
        .update({ read: true});
    });

  }

  /**
   * send message to start chat
   *
   * @param {LoggedInMember} loggedInUser
   * @param {UserModel} sender
   */
  startPrivateChat(loggedInUser: LoggedInMember, sender: UserModel) {
    const privateMessageDialog = this.dialogService.open(ChatMemberDialogComponent, {
      height: '40%',
      width: '50%',
      data: {
        recipient: loggedInUser,
        sender: sender
      },
      disableClose: true
    });
    privateMessageDialog.afterClosed().subscribe((data: any) => {
    });
  }

  /**
   *
   *
   */
  unsubscribe() {
    if (this.privateMessageSub) {
      this.privateMessageSub = null;
    }
  }


}
