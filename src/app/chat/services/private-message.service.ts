import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {LoggedInMember} from '../models/logged-in.member';
import {ChatMemberDialogComponent} from '../components/chat-member-dialog/chat-member-dialog.component';
import {AngularFirestore} from 'angularfire2/firestore';
import {UserModel} from '../../user/user-model';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import {SetChatRooms} from '../chat.actions';
import {ChatRoomModel} from '../models/chat-room.model';
import {PrivateMessage} from '../models/private-message';

@Injectable()
export class PrivateMessageService {

  constructor(private dialogService: MatDialog,
              private db: AngularFirestore) {
              //private store: Store<fromApp.State>) {
    // this.store.select(fromApp.getUser)
    //   .subscribe((user: UserModel) => {
    //     console.log('got user', user);
    //     //this.userMessageSub(user);
    //   });
  }

  private userMessageSub(user: UserModel) {
    this.db.collection('users/' + user.id + '/privateMessages')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          console.log('doc', doc);
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
        error => {}
      );
  }

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


}
