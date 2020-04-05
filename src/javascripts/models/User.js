import { Record, List, fromJS } from 'immutable';

import Tag from './Tag';
import AnswerHistory from './AnswerHistory';


const profileFields = [
  "name",
  "userDefinedId",
  "introductionText",
  "tags",
  "iconUrl",
];

const collection = {
  id: null,
  userDefinedId: "",
  name: "",
  iconUrl: "",
  introductionText: "",
  tags: new List(),
  answerHistories: new List(),
};

export default class User extends Record(collection) {
  static fromJS(user = {}) {
    const tags = (user.tags || []).map(tag => new Tag(tag));
    const answerHistories = (user.answerHistories || []).map(answerHistory => AnswerHistory.fromJS(answerHistory));

    return (new this(user)).merge(fromJS({
      tags,
      answerHistories,
    }));
  }

  isAuther(content) {
    return this.id === content.user.id;
  }

  profile() {
    const user = this.toJS();
    const profile = {};
    profileFields.forEach((field) => {
      profile[field] = user[field];
    });
    return profile;
  }

  isSameProfileObj(srcObj) {
    const obj = { ...srcObj, tags: srcObj.tags.uniq("value").compact("value") };

    const profile = this.profile();

    const basicFields = [
      "userDefinedId",
      "name",
      "iconUrl",
      "introductionText",
    ];
    if (basicFields.some(name => profile[name] !== obj[name])) return false;

    if (profile.tags.length !== obj.tags.length) return false;

    if (profile.tags.some(tag => obj.tags.every(objTag => tag.value !== objTag.value))) {
      return false;
    }

    return true;
  }

  getNewerAnswerHistoryQuestions(num = 10) {
    return this.answerHistories.reduce(
      (reducedHistories, answerHistory) => {
        if (
          answerHistory.question.id
          && !reducedHistories.some(reducedHistory => reducedHistory.question.id === answerHistory.question.id)
        ) {
          reducedHistories.push(answerHistory);
        }
        return reducedHistories;
      }, []
    ).slice(0, num).map(history => history.question);
  }
}
