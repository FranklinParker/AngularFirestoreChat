import {ChatRoomOwnerModel} from './chat-room-owner.model';

export interface ChatRoomModel {
  name: string;
  isPrivate: boolean;
  id?: string;
  owner?: ChatRoomOwnerModel;
  loggedInUserId?: string;
}
