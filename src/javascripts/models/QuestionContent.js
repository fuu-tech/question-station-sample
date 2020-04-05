import { Record, List, fromJS } from 'immutable';

import Choice from './Choice';


const collection = {
  id: null,
  sentence: "",
  explanation: "",
  answerHistoryContentCounter: null,
  correctAnswerHistoryContentCounter: null,
  choices: new List(),
};

export default class QuestionContent extends Record(collection) {
  static fromJS(questionContent = {}) {
    const choices = (questionContent.choices || []).map(choice => new Choice(choice));

    return (new this(questionContent)).merge(fromJS({
      choices,
    }));
  }
}
