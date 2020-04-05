import { Record } from 'immutable';

const collection = {
  id: null,
  value: "",
  isAnswer: null,
};

export default class Choice extends Record(collection) {
}
