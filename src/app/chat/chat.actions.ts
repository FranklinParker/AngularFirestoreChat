import {ChatRoomModel} from './chat-room.model';

export const SET_CHAT_ROOMS = '[CHAT] Set Chat rooms';
export const UNSET_CHAT_ROOMS = '[AUTH] UnSet Chat Rooms';

import {Action} from '@ngrx/store';


export class SetChatRooms implements Action {
  readonly type = SET_CHAT_ROOMS;

  constructor(public payload: ChatRoomModel[]) {
  }

}

export class UnsetChatRooms implements Action {
  readonly type = UNSET_CHAT_ROOMS;
}

export type ChatActions = SetChatRooms | UnsetChatRooms;
