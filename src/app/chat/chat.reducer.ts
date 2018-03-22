import {
  ChatActions,
  SET_CHAT_ROOMS,
  UNSET_CHAT_ROOMS,
  SET_LOGGED_IN_USERS,
  UNSET_LOGGED_IN_USERS

} from './chat.actions';
import {ChatRoomModel} from './models/chat-room.model';
import {LoggedInMember} from './models/logged-in.member';

export interface State {
  chatRooms: ChatRoomModel[];
  loggedInMembers: LoggedInMember[];

}


const initialState: State = {
  chatRooms: [],
  loggedInMembers: []
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
    case SET_LOGGED_IN_USERS:
      return {
        ...state,
        loggedInMembers: action.payload
      };
    case UNSET_LOGGED_IN_USERS:
      return {
        ...state,
        loggedInMembers: []
      };

    default:
      return state;
  }
}

export const getChatRooms = (state: State) => state.chatRooms;
export const getLoggedInMembers = (state: State) => state.loggedInMembers;




