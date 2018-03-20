import {ChatRoomOwnerModel} from './chat-room-owner.model';
import {LoggedInMember} from './logged-in.member';

export interface ChatRoomModel {
  id: string;
  name: string;
  owner: ChatRoomOwnerModel;
  loggedInUserId?: string;
}
