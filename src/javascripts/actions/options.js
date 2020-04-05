import * as types from '../constants/actionTypes';


export function setIsMobile(isMobile) {
  return {
    type: types.SET_IS_MOBILE,
    isMobile
  };
}

export function setConfirmMessage(confirmMessage) {
  return {
    type: types.SET_CONFIRM_MESSAGE,
    confirmMessage
  };
}
