import * as fromAuth from './user/auth.reducer';
import * as fromUser from './user/user.reducer';
import * as fromChat from './chat/chat.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';


export interface State {
  auth: fromAuth.State;
  user: fromUser.State;
  chat: fromChat.State;
}

export const reducers:  ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducer,
  chat: fromChat.chatReducer
};


export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuthenticated);

export const getUserState = createFeatureSelector<fromUser.State>('user');
export const getUser = createSelector(getUserState, fromUser.getUser);

export const getChatState = createFeatureSelector<fromChat.State>('chat');
export const getChatRooms = createSelector( getChatState , fromChat.getChatRooms);
export const getLoggedInMembers = createSelector( getChatState , fromChat.getLoggedInMembers);








