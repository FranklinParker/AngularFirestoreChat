import {Injectable, OnInit} from '@angular/core';
import {LoggedInMember} from '../models/logged-in.member';
import {PrivateMessage} from '../models/private-message';
import {AngularFirestore} from 'angularfire2/firestore';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app.reducer';

@Injectable()
export class SendPrivateMessageService  {

  constructor(private db: AngularFirestore) { }


  /**
   * send a private message
   *
   * @param {LoggedInMember} loggedInMember
   * @param {PrivateMessage} privateMessage
   */
  sendPrivateMessage(loggedInMember: LoggedInMember,
                     privateMessage: PrivateMessage) {
    this.db.collection('users/' + loggedInMember.userId
      + '/privateMessages', )
      .add(privateMessage)
      .then((result) => {
      })
      .catch(err => {
      });

  }

}
