import {UserModel} from '../../user/user-model';

export interface PrivateMessageChatRoom {
  sender: UserModel;
  privateMessages?: [{
    messageId: string;
    message: string;
    read: boolean;
  }];
}
