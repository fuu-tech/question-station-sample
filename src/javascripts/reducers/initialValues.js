import { Map } from 'immutable';

import * as types from '../constants/actionTypes';
import { initialContentNewValues, initialSearchValues } from '../constants/initialValues';


const initialContentNewValuesStr = localStorage.getItem("contentNewValuesCache");
let contentNewValuesCache = null;
try {
  contentNewValuesCache = initialContentNewValuesStr && JSON.parse(initialContentNewValuesStr);
} catch {
  contentNewValuesCache = initialSearchValues;
}
localStorage.setItem("contentNewValuesCache", JSON.stringify(initialContentNewValues));

const INITIAL_STATE = new Map({
  contentNewValuesCache: contentNewValuesCache || initialContentNewValues,
  searchValuesCache: initialSearchValues,
});

export default function initialValues(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGOUT_USER_SUCCESS:
      return INITIAL_STATE;
    case types.CACHE_CONTENT_NEW_VALUES:
      return state.set("contentNewValuesCache", action.values);
    case types.CACHE_SEARCH_VALUES:
      return state.set("searchValuesCache", action.values);
    default:
      return state;
  }
}
