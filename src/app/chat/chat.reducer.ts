import {
  ChatActions,
  SET_CHAT_ROOMS,
  UNSET_CHAT_ROOMS
}
from './chat.actions';
import {ChatRoomModel} from './models/chat-room.model';

export interface State {
  chatRooms: ChatRoomModel[];
}


const initialState: State = {
  chatRooms: []
};

export function chatReducer(state = initialState, action: ChatActions) {
  switch (action.type) {
    case SET_CHAT_ROOMS:
      return {
        chatRooms: action.payload
      };
    case UNSET_CHAT_ROOMS:
      return {
        chatRooms: []
      };
    default:
      return state;
  }
}

export const getChatRooms = (state: State) => state.chatRooms;

