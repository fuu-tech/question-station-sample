import * as types from '../constants/actionTypes';


export function cacheContentNewValues(values) {
  return {
    type: types.CACHE_CONTENT_NEW_VALUES,
    values
  };
}

export function cacheSearchValues(values) {
  return {
    type: types.CACHE_SEARCH_VALUES,
    values
  };
}
