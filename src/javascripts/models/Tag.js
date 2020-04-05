import { Record } from 'immutable';

const collection = {
  id: null,
  value: "",
  usedCounter: null,
};

export default class Tag extends Record(collection) {
}
