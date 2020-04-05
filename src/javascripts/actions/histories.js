import * as types from '../constants/actionTypes';


export function setAnswerHistory(answerHistory) {
  return {
    type: types.SET_ANSWER_HISTORY,
    answerHistory
  };
}

export function fetchAnswerHistory(id) {
  return {
    type: types.UPDATING_DISPLAYED_ANSWER_HISTORY_SUCCESS,
    id
  };
}

export function createAnswerHistory(content) {
  return {
    type: types.CREATING_ANSWER_HISTORY_SUCCESS,
    content,
  };
}

export function updateAnswerHistoryContent(requestParams) {
  return {
    type: types.UPDATING_ANSWER_HISTORY_CONTENT_REQUEST,
    requestParams
  };
}

export function finishAnswerHistory(answerHistory) {
  return {
    type: types.FINISH_ANSWER_HISTORY_SUCCESS,
    answerHistory
  };
}
