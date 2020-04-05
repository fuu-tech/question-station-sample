import { Record, fromJS } from 'immutable';

import QuestionContent from './QuestionContent';


const collection = {
  id: null,
  isCorrect: null,
  questionContentChoiceId: null,
  questionContent: new QuestionContent(),
};

export default class AnswerHistoryContent extends Record(collection) {
  static fromJS(answerHistoryContent = {}) {
    const questionContent = QuestionContent.fromJS(answerHistoryContent.questionContent || {});

    return (new this(answerHistoryContent)).merge(fromJS({
      questionContent,
    }));
  }
}
