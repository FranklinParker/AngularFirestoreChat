import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoggedInMember} from '../../models/logged-in.member';
import {PrivateMessageService} from '../../services/private-message.service';
import {UserModel} from '../../../user/user-model';
import {SendPrivateMessageService} from '../../services/send-private-message.service';
import {PrivateMessage} from '../../models/private-message';

@Component({
  selector: 'app-chat-member-dialog',
  templateUrl: './chat-member-dialog.component.html',
  styleUrls: ['./chat-member-dialog.component.css']
})
export class ChatMemberDialogComponent implements OnInit {
  recipient: LoggedInMember;
  sender: UserModel;
  messageToSend: string;

  constructor(public dialogRef: MatDialogRef<ChatMemberDialogComponent>,
              private sendMessageService: SendPrivateMessageService,
              @Inject(MAT_DIALOG_DATA) data: {
                recipient: LoggedInMember,
                sender: UserModel
              }) {
    this.recipient = data.recipient;
    this.sender = data.sender;
  }

  ngOnInit() {
  }

  /**
   * send private message
   *
   */
  onSendMessage() {
    const message: PrivateMessage = {
      sender: this.sender,
      message: this.messageToSend
    };
    this.sendMessageService.sendPrivateMessage(this.recipient,
      message);
    this.dialogRef.close();

  }

  onCancel() {
    this.dialogRef.close();
  }

}
