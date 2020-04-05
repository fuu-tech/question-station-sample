import { Map } from 'immutable';

import User from '../models/User';
import * as types from '../constants/actionTypes';
import { initialCurrentUser } from '../constants/initialValues';


const INITIAL_STATE = new Map({
  currentUser: new User(),
  user: new User(),
});

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_USER:
      return state.set("user", action.user);
    case types.INIT_CURRENT_USER_SUCCESS:
      return state.set("currentUser", User.fromJS(initialCurrentUser));
    case types.UPDATING_CURRENT_USER_SUCCESS:
      return state.update("currentUser", user => User.fromJS(user.merge(action.user)));
    case types.LOGOUT_USER_SUCCESS:
      return INITIAL_STATE.set("user", state.get("user"));
    default:
      return state;
  }
}
