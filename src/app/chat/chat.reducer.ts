import {
  ChatActions,
  SET_CHAT_ROOMS,
  UNSET_CHAT_ROOMS,
  SELECTED_CHATROOM_CHANGED
}
  from './chat.actions';
import {ChatRoomModel} from './models/chat-room.model';

export interface State {
  chatRooms: ChatRoomModel[];
  selectedChatRoom: ChatRoomModel;

}


const initialState: State = {
  chatRooms: [],
  selectedChatRoom: null
};

export function chatReducer(state = initialState, action: ChatActions) {
  switch (action.type) {
    case SET_CHAT_ROOMS:
      return {
        ...state,
        chatRooms: action.payload
      };
    case UNSET_CHAT_ROOMS:
      return {
        ...state,
        chatRooms: []
      };
     case SELECTED_CHATROOM_CHANGED:
       return {
         ...state,
         selectedChatRoom: action.payload
       };
    default:
      return state;
  }
}

export const getChatRooms = (state: State) => state.chatRooms;
export const getSelectedChatRoom = (state: State) => state.selectedChatRoom;



