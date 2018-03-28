import {UserModel} from '../../user/user-model';

export interface PrivateMessage {
  sender: UserModel;
  message: string;
  read: boolean;
  id?: string;
}
