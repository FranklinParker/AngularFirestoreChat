import {
  ChatActions,
  SET_CHAT_ROOMS,
  UNSET_CHAT_ROOMS,
  SET_LOGGED_IN_USERS,
  UNSET_LOGGED_IN_USERS,
  ADD_PRIVATE_MESSAGE

} from './chat.actions';
import {ChatRoomModel} from './models/chat-room.model';
import {LoggedInMember} from './models/logged-in.member';
import {PrivateMessage} from './models/private-message';

export interface State {
  chatRooms: ChatRoomModel[];
  loggedInMembers: LoggedInMember[];
  privateMessagesNew: PrivateMessage[];
  privateMessagesArchived: PrivateMessage[];

}


const initialState: State = {
  chatRooms: [],
  loggedInMembers: [],
  privateMessagesNew: [],
  privateMessagesArchived: []

};

export function chatReducer(state = initialState, action: ChatActions) {
  switch (action.type) {
    case SET_CHAT_ROOMS:
      return {
        ...state,
        chatRooms: action['payload']
      };
    case UNSET_CHAT_ROOMS:
      return {
        ...state,
        chatRooms: []
      };
    case SET_LOGGED_IN_USERS:
      return {
        ...state,
        loggedInMembers: action['payload']
      };
    case UNSET_LOGGED_IN_USERS:
      return {
        ...state,
        loggedInMembers: []
      };
    case ADD_PRIVATE_MESSAGE:
      const privateMessageOld = state.privateMessagesArchived;
      state.privateMessagesNew.forEach((privMsg: PrivateMessage) => {
        privateMessageOld.push(privMsg);
      });
      console.log('privateMessageOld', privateMessageOld);

      console.log('privateMessageNew', state.privateMessagesNew);
      const newPrivateMessage: PrivateMessage[] = [];
      action['payload'].forEach((privMsg: PrivateMessage) => {
        const pm = privateMessageOld.filter((sPm: PrivateMessage) => sPm.id === privMsg.id);
        console.log('found', pm);
        if (pm.length === 0) {
          newPrivateMessage.push(privMsg);
        }
      });
      // const privateMessageNew = state.
      return {
        ...state,
        privateMessagesArchived: privateMessageOld,
        privateMessagesNew: newPrivateMessage
      };

    default:
      return state;
  }
}

export const getChatRooms = (state: State) => state.chatRooms;
export const getLoggedInMembers = (state: State) => state.loggedInMembers;
export const getPrivateMessagesNew = (state: State) => state.privateMessagesNew;
export const getPrivateMessagesArchived = (state: State) => state.privateMessagesArchived;





