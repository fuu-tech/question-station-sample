import { Map } from 'immutable';

import * as types from '../constants/actionTypes';


const INITIAL_STATE = new Map({
  isMobile: false,
  confirmMessage: "",
});

export default function options(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGOUT_USER_SUCCESS:
      return INITIAL_STATE.set("isMobile", state.get("isMobile"));
    case types.SET_CONFIRM_MESSAGE:
      return state.set("confirmMessage", action.confirmMessage);
    case types.SET_IS_MOBILE:
      return state.set("isMobile", action.isMobile);
    default:
      return state;
  }
}
