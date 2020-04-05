import { Map, List } from 'immutable';
import { format } from 'date-fns';

import AnswerHistory from '../models/AnswerHistory';
import * as types from '../constants/actionTypes';
import { answerHistoryStatuses } from '../constants/answerHistoryStatuses';
import { answerHistoryTypes } from '../constants/answerHistoryTypes';
import { dateFormat } from '../constants/format';

let answerHistoryId = 0;
let answerHistoryContentId = 0;

const INITIAL_STATE = new Map({
  answerHistories: new List(),
  answerHistory: new AnswerHistory(),
});

export default function histories(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOGOUT_USER_SUCCESS:
      return INITIAL_STATE;
    case types.SET_ANSWER_HISTORY:
      return state.set("answerHistory", action.answerHistory);
    case types.CREATING_ANSWER_HISTORY_SUCCESS:
      answerHistoryId += 1;
      return state.set("answerHistory", AnswerHistory.fromJS({
        id: answerHistoryId,
        answerHistoryStatus: answerHistoryStatuses.wip,
        answerHistoryType: answerHistoryTypes.normal,
        updatedAt: format(new Date(), dateFormat),
        content: action.content,
        answerHistoryContents: action.content.question.questionContents.map((questionContent) => {
          answerHistoryContentId += 1;
          return {
            id: answerHistoryContentId,
            isCorrect: false,
            questionContent,
          };
        }),
      }));
    case types.UPDATING_DISPLAYED_ANSWER_HISTORY_SUCCESS:
      return state.set(
        "answerHistory",
        state.get("answerHistories").find(tmpHistory => tmpHistory.id === action.id) || new AnswerHistory()
      );
    case types.UPDATING_ANSWER_HISTORY_CONTENT_REQUEST:
      return state.update(
        "answerHistory", answerHistory => answerHistory.update("answerHistoryContents", (answerHistoryContents) => {
          const { questionContentId, choiceId } = action.requestParams;
          const index = answerHistoryContents.findIndex(
            historyContent => historyContent.questionContent.id === questionContentId
          );
          const correctChoices = answerHistoryContents.get(index).questionContent.choices.filter(
            choice => choice.isAnswer
          );
          const isCorrect = correctChoices.some((choice => choice.id === choiceId));
          return answerHistoryContents.update(
            index,
            historyContent => historyContent.set("questionContentChoiceId", choiceId).set("isCorrect", isCorrect)
          );
        })
      );
    case types.FINISH_ANSWER_HISTORY_SUCCESS: {
      let answerHistory = state.get("answerHistory");
      const correctAnswerNum = answerHistory.answerHistoryContents.filter(
        historyContent => historyContent.isCorrect
      ).size;
      answerHistory = answerHistory.merge({
        answerHistoryStatus: answerHistoryStatuses.finished,
        correctAnswerRate: (correctAnswerNum * 100) / answerHistory.answerHistoryContents.size,
      });
      return state.set(
        "answerHistory", answerHistory
      ).update("answerHistories", answerHistories => answerHistories.unshift(answerHistory));
    }
    default:
      return state;
  }
}
