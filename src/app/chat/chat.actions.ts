import {ChatRoomModel} from './models/chat-room.model';

export const SET_CHAT_ROOMS = '[CHAT] Set Chat rooms';
export const UNSET_CHAT_ROOMS = '[CHAT] Unset Chat Rooms';

export const SET_LOGGED_IN_USERS = '[CHAT] Set logged in users';
export const UNSET_LOGGED_IN_USERS = '[CHAT] Unset logged in users';



import {Action} from '@ngrx/store';
import {LoggedInMember} from './models/logged-in.member';


export class SetChatRooms implements Action {
  readonly type = SET_CHAT_ROOMS;

  constructor(public payload: ChatRoomModel[]) {
  }

}

export class UnsetChatRooms implements Action {
  readonly type = UNSET_CHAT_ROOMS;
}



export class SetLoggedInUsers implements Action {
  readonly type = SET_LOGGED_IN_USERS;

  constructor(public payload: LoggedInMember[]) {
  }

}

export class UnsetLoggedInMembers implements Action {
  readonly type = UNSET_LOGGED_IN_USERS;
}


export type ChatActions = SetChatRooms | UnsetChatRooms | SetLoggedInUsers | UnsetLoggedInMembers;
