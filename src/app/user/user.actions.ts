import {UserModel} from './user-model';

export const SET_USER = '[USER] Set User';
export const UNSET_USER = '[USER] Unset User';

import { Action } from '@ngrx/store';


export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload: UserModel) {
  }

}

export class UnsetUser implements Action {
  readonly type = UNSET_USER;
}

export type UserActions = SetUser | UnsetUser;
