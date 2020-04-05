import * as types from '../constants/actionTypes';


export function setNews(news) {
  return {
    type: types.SET_NEWS,
    news
  };
}

export function fetchNews(id) {
  return {
    type: types.FETCHING_NEWS_SUCCESS,
    id,
  };
}
