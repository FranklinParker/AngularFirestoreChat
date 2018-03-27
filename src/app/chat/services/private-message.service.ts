import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {LoggedInMember} from '../models/logged-in.member';
import {ChatMemberDialogComponent} from '../components/chat-member-dialog/chat-member-dialog.component';
import {AngularFirestore} from 'angularfire2/firestore';
import {PrivateMessage} from '../models/private-message';
import {UserModel} from '../../user/user-model';

@Injectable()
export class PrivateMessageService {

  constructor(private dialogService: MatDialog) {
  }

  startPrivateChat(loggedInUser: LoggedInMember, sender:UserModel) {
    const privateMessageDialog = this.dialogService.open(ChatMemberDialogComponent, {
      height: '40%',
      width: '50%',
      data: { recipient: loggedInUser,
              sender: sender},
      disableClose: true
    });
    privateMessageDialog.afterClosed().subscribe((data: any) => {
      console.log('data', data);
    });
  }


}
