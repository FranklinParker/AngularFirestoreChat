import {ChatRoomOwnerModel} from './chat-room-owner.model';

export interface ChatRoomModel {
  id: string;
  name: string;
  owner: ChatRoomOwnerModel;
  loggedInUserId?: string;
}
