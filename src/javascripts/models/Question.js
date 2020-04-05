import { Record, List, fromJS } from 'immutable';

import QuestionContent from './QuestionContent';


const collection = {
  id: null,
  version: null,
  finishAnswerHistoryCounter: null,
  totalCorrectAnswerRate: null,
  questionContents: new List(),
};

export default class Question extends Record(collection) {
  static fromJS(question = {}) {
    const questionContents = (question.questionContents || []).map(
      questionContent => QuestionContent.fromJS(questionContent)
    );

    return (new this(question)).merge(fromJS({
      questionContents,
    }));
  }
}
