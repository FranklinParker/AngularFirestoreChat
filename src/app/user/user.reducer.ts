import {
  UserActions,
  SET_USER,
  UNSET_USER} from './user.actions';
import {UserModel} from './user-model';

export interface State {
  user: UserModel;
}


const initialState: State = {
  user: null
};



export function userReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case SET_USER:
      return {
        user: action.payload
      };
    case UNSET_USER:
      return {
        user: null
      };
    default:
      return state;
  }
}

export const getUser = (state: State) => state.user;

