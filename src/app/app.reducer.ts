import * as fromAuth from './user/auth.reducer';
import * as fromUser from './user/user.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';


export interface State {
  auth: fromAuth.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  user: fromUser.userReducer
};


export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuthenticated);


export const getUserState = createFeatureSelector<fromUser.State>('user');
export const getUser = createSelector(getUserState, fromUser.getUser);




