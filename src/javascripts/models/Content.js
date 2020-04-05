import { Record, List, fromJS } from 'immutable';

import Tag from './Tag';
import SimplifiedUser from './SimplifiedUser';
import Question from './Question';


const collection = {
  id: null,
  title: "",
  explanation: "",
  contentType: "",
  createdAt: "",
  user: new SimplifiedUser(), // new User()にしたいが、循環定義になって無理
  tags: new List(),
  question: new Question(),
};

export default class Content extends Record(collection) {
  static fromJS(content = {}) {
    const user = SimplifiedUser.fromJS(content.user || {});
    const tags = (content.tags || []).map(tag => new Tag(tag));
    const question = Question.fromJS(content.question || {});

    return (new this(content)).merge(fromJS({
      user,
      tags,
      question,
    }));
  }
}
