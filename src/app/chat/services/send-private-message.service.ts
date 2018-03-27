import { Injectable } from '@angular/core';
import {LoggedInMember} from '../models/logged-in.member';
import {PrivateMessage} from '../models/private-message';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class SendPrivateMessageService {

  constructor(private db: AngularFirestore) { }

  sendPrivateMessage(loggedInMember: LoggedInMember,
                     privateMessage: PrivateMessage) {
    this.db.collection('users/' + loggedInMember.userId
      + '/privateMessages')
      .add(privateMessage)
      .then((result) => {
      })
      .catch(err => {
      });

  }

}
