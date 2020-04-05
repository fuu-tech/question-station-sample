import { Map, List } from 'immutable';

import Content from '../models/Content';
import Question from '../models/Question';
import * as types from '../constants/actionTypes';
import { initialContents } from '../constants/initialValues';


const INITIAL_STATE = new Map({
  newContents: initialContents,
  content: new Content(),
});

export default function contents(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGOUT_USER_SUCCESS:
      return INITIAL_STATE.set("newContents", state.get("newContents")).set(
        "content", state.get("content").merge({
          question: new Question(),
        })
      );
    case types.UPDATING_NEW_CONTENTS_SUCCESS:
      return state.set(
        "newContents",
        (new List(action.response.contents)).map(content => Content.fromJS(content))
      );
    case types.SET_CONTENT:
      return state.set("content", action.content);
    case types.UPDATING_DISPLAYED_CONTENT_SUCCESS:
      return state.set(
        "content",
        state.get("newContents").find(tmpContent => tmpContent.id === action.id) || new Content({})
      );
    case types.CREATING_CONTENT_SUCCESS:
      return state.update("newContents", tmpContents => tmpContents.unshift(Content.fromJS(action.content)));
    default:
      return state;
  }
}
