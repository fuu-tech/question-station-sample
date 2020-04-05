import { Record, fromJS, List } from 'immutable';

import Content from './Content';
import AnswerHistoryContent from './AnswerHistoryContent';


const collection = {
  id: null,
  answerHistoryStatus: "",
  answerHistoryType: "",
  correctAnswerRate: null,
  updatedAt: "",
  content: new Content(),
  answerHistoryContents: new List(),
};

export default class AnswerHistory extends Record(collection) {
  static fromJS(answerHistory = {}) {
    const content = Content.fromJS(answerHistory.content || {});
    const answerHistoryContents = (answerHistory.answerHistoryContents || []).map(
      answerHistoryContent => AnswerHistoryContent.fromJS(answerHistoryContent)
    );

    return (new this(answerHistory)).merge(fromJS({
      content,
      answerHistoryContents,
    }));
  }

  static createFromQuestionContents(questionContents = []) {
    const answerHistoryContents = questionContents.map((content) => {
      return { questionContent: content };
    });
    return this.fromJS({ answerHistoryContents });
  }
}
