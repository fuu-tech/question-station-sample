import { Map, List } from 'immutable';


const INITIAL_STATE = new Map({
  workbooks: new List(),
  contents: new List(),
  users: new List(),
  totalCount: null,
  totalPages: 0,
});

export default function search(state = INITIAL_STATE) {
  return state;
}
