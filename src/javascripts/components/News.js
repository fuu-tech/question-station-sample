/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ErrorIcon from '@material-ui/icons/Error';

import MarkDown from './atoms/MarkDown';
import PageExplanation from './molecules/PageExplanation';
import RightNoteBlock from './molecules/RightNoteBlock';
import { fetchNews } from '../actions/news';
import { newsTypes } from '../constants/newsTypes';


const newsSelector = state => state.news.get('news');

const News = () => {
  const dispatch = useDispatch();
  const news = useSelector(newsSelector);
  const params = useParams();

  useEffect(() => {
    if (!news.id) {
      dispatch(fetchNews(Number(params.id)));
    }
  }, []);

  let content = "お知らせが存在しません";
  if (news && news.id) {
    content = (
      <div className="markdown-padding-container">
        <MarkDown sentence={news.text} />
      </div>
    );
  }

  return (
    <div>
      <PageExplanation
        Icon={news.newsType === newsTypes.emergency ? ErrorIcon : NotificationsIcon}
        title={news.title || ""}
        explanation={news.createdAt ? <RightNoteBlock>{news.createdAt}</RightNoteBlock> : ""}
      />
      {content}
    </div>
  );
};

export default News;
