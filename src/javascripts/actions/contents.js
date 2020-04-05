/* eslint-disable max-lines */

import * as types from '../constants/actionTypes';


export function setContent(content) {
  return {
    type: types.SET_CONTENT,
    content
  };
}

export function updateDisplayedContent(id) {
  return {
    type: types.UPDATING_DISPLAYED_CONTENT_SUCCESS,
    id
  };
}

export function createContent(content) {
  return {
    type: types.CREATING_CONTENT_SUCCESS,
    content
  };
}
