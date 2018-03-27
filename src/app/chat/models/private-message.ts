import {UserModel} from '../../user/user-model';

export interface PrivateMessage {
  sender: UserModel;
  message: string;
  id?: string;
}
