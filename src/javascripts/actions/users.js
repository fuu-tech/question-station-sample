import * as types from '../constants/actionTypes';


export function setUser(user) {
  return {
    type: types.SET_USER,
    user
  };
}

export function initCurrentUser() {
  return {
    type: types.INIT_CURRENT_USER_SUCCESS,
  };
}

export function logoutUser() {
  return {
    type: types.LOGOUT_USER_SUCCESS,
  };
}

export function updateCurrentUser(params) {
  return {
    type: types.UPDATING_CURRENT_USER_SUCCESS,
    user: {
      ...params,
      tags: params.tags.map((tag, index) => {
        return { id: index, ...tag };
      }),
    }
  };
}
