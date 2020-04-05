import { Map, List } from 'immutable';
import { format } from 'date-fns';

import * as types from '../constants/actionTypes';
import { dateFormat } from '../constants/format';


const INITIAL_STATE = new Map({
  news: {},
  newsList: new List([{
    id: 1,
    title: "本ソースコードについて",
    text: `Webサービス「Question Station」のフロント側の一部コードを抜粋し、簡略化したものです。※本来の挙動とは異なる点が多々あります。

本コードはMITライセンスのもとで配布いたします。拙いコードですが、何かの参考になれば幸いです。

Webサービス「Question Station」へのリンク
[Question Station](https://que-sta.space)`,
    createdAt: format(new Date(), dateFormat),
  }]),
});

export default function news(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_NEWS:
      return state.set("news", action.news);
    case types.FETCHING_NEWS_SUCCESS:
      return state.set("news", state.get("newsList").find(tmpNews => tmpNews.id === action.id) || {});
    default:
      return state;
  }
}
