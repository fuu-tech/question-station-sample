import { Record, List, fromJS } from 'immutable';

import Tag from './Tag';


const collection = {
  id: null,
  userDefinedId: "",
  name: "",
  iconUrl: "",
  introductionText: "",
  favoriteUserCounter: null,
  myParticipationCounter: null,
  myCommentCounter: null,
  myFinishAnswerHistoryCounter: null,
  myTotalCorrectAnswerRate: null,
  favoredUserCounter: null,
  createdContentCounter: null,
  createdQuestionCounter: null,
  createdDiscussionCounter: null,
  totalCommentedCounter: null,
  totalFinishAnswerHistoryCounter: null,
  totalCorrectAnswerRate: null,
  tags: new List(),
};

export default class SimplifiedUser extends Record(collection) {
  static fromJS(user = {}) {
    const tags = (user.tags || []).map(tag => new Tag(tag));
    return (new this(user)).merge(fromJS({
      tags,
    }));
  }
}
