import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoggedInMember} from '../models/logged-in.member';
import {ChatMemberDialogComponent} from '../components/chat-member-dialog/chat-member-dialog.component';
import {AngularFirestore} from 'angularfire2/firestore';
import {UserModel} from '../../user/user-model';

import {PrivateMessage} from '../models/private-message';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class PrivateMessageService {
  privateMessageSub: Subscription;

  constructor(private dialogService: MatDialog,
              private db: AngularFirestore) {
  }

  /**
   * when a user is activated want to listen for his
   *  private messages
   *
   * @param {UserModel} user
   */
  userPrivateMessageSub(user: UserModel) {
    this.privateMessageSub =
      this.db.collection('users/' + user.id + '/privateMessages')
        .snapshotChanges([ 'added'])
        .map(docArray => {
          return docArray.map(doc => {
            const privateMessage = doc.payload.doc.data();
            return {
              id: doc.payload.doc.id,
              message: privateMessage.message,
              sender: privateMessage.sender
            };
          });
        })
        .subscribe(
          (privateMessages: PrivateMessage[]) => {
            console.log('privateMessages', privateMessages);
          },
          error => {
          }
        );
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
      console.log('data', data);
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
