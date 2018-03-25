import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoggedInMember} from '../../models/logged-in.member';

@Component({
  selector: 'app-chat-member-dialog',
  templateUrl: './chat-member-dialog.component.html',
  styleUrls: ['./chat-member-dialog.component.css']
})
export class ChatMemberDialogComponent implements OnInit {
  loggedInMember: LoggedInMember;

  constructor(public dialogRef: MatDialogRef<ChatMemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) loggedInMember: LoggedInMember) {
    this.loggedInMember = loggedInMember;
  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

}
