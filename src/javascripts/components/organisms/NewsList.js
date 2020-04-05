import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { List as ListModel } from 'immutable';
import { useDispatch } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ErrorIcon from '@material-ui/icons/Error';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import List from '../atoms/List';
import LinkListItem from '../atoms/LinkListItem';
import Label from '../atoms/Label';
import Button from '../atoms/Button';
import { setNews } from '../../actions/news';
import { newsTypes } from '../../constants/newsTypes';
import { routes } from '../../constants/routes';


const propTypes = {
  newsList: PropTypes.instanceOf(ListModel).isRequired,
};

const defaultSize = 5;

const NewsList = ({ newsList }) => {
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();

  const renderCard = news => (
    <LinkListItem to={routes.news(news.id)} onClick={() => dispatch(setNews(news))} key={news.id} disableTextDecoration>
      <div className="news-card">
        <ListItemIcon>
          {news.newsType === newsTypes.news ? <NotificationsIcon /> : <ErrorIcon />}
        </ListItemIcon>
        <ListItemText primary={news.title} secondary={news.createdAt} />
      </div>
    </LinkListItem>
  );

  const onClick = () => setMore(!more);

  return (
    <div className="news-container">
      <Label>お知らせ</Label>
      <List list={more ? newsList : newsList.slice(0, defaultSize)} renderCard={renderCard} />
      {newsList.size > defaultSize && (
        <Button onClick={onClick} style={{ color: "none", backgroundColor: "none", width: "100%" }}>
          {more ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
      )}
    </div>
  );
};

NewsList.propTypes = propTypes;
export default NewsList;
