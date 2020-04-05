/* eslint-disable max-len */

import { List } from 'immutable';
import { format } from 'date-fns';

import User from '../models/User';
import Content from '../models/Content';
import { contentTypes } from './contentTypes';
import { searchTypes } from './searchTypes';
import { contentSortTypes } from './sortTypes';
import { queryTypes } from './queryTypes';
import { dateFormat } from './format';


export const initialQuestionContentValues = Object.freeze({
  choices: Object.freeze([
    Object.freeze({ value: "", isAnswer: true }),
    Object.freeze({ value: "", isAnswer: false }),
  ])
});

export const initialContentNewValues = Object.freeze({
  contentType: contentTypes.question,
  tags: Object.freeze([Object.freeze({ value: "" })]),
  questionContents: Object.freeze([initialQuestionContentValues]),
});

export const initialSearchValues = Object.freeze({
  queryType: queryTypes.pagination,
  word: "",
  sortKey: contentSortTypes.newer,
  searchType: searchTypes.allContents,
  order: "desc",
  limit: 30,
  page: 1,
});

export const initialCurrentUser = User.fromJS({
  id: 1,
  userDefinedId: "question_station",
  name: "クイズ太郎",
  iconUrl: window.location.origin + "/favicon.ico",
  introductionText: "サンプルユーザーです",
  tags: [{ id: 1, value: "クエステ" }],
  answerHistories: [],
});

export const initialContents = new List([
  Content.fromJS({
    id: 1,
    title: "Markdown記法おさらい",
    explanation: "どのような書き方をすると、どのように表示されるか**確認**してみましょう。 なおこの問題では本サービスのMarkdown機能での表示を基準としています。",
    contentType: contentTypes.question,
    createdAt: format(new Date(), dateFormat),
    user: initialCurrentUser,
    tags: [{ id: 2, value: "Markdown" }],
    question: {
      id: 1,
      version: 1,
      questionContents: [
        {
          id: 1,
          sentence: "次のようなMarkdownの記述を行った場合、どのように表示されるか選択せよ。 ``` ~~Question Station~~ ```",
          explanation: "``` ~~Question Station~~ ``` これは取り消し線を表す記述となります。",
          choices: [
            { id: 1, value: "~~Question Station~~", isAnswer: true },
            { id: 2, value: "*Question Station*", isAnswer: false },
            { id: 3, value: "**Question Station**", isAnswer: false },
            { id: 4, value: "==Question Station==", isAnswer: false },
          ]
        },
        {
          id: 2,
          sentence: "次のようなMarkdownの記述を行った場合、どのように表示されるか選択せよ。 ``` ~~Question Station~~ ```",
          explanation: "``` ~~Question Station~~ ``` これは取り消し線を表す記述となります。",
          choices: [
            { id: 5, value: "> Question Station", isAnswer: true },
            { id: 6, value: "~~Question Station~~", isAnswer: false },
            { id: 7, value: "==Question Station==", isAnswer: false },
            { id: 8, value: "*Question Station*", isAnswer: false },
          ]
        },
      ]
    }
  }),
]);
