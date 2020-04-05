import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import HomeSharp from '@material-ui/icons/HomeSharp';

import Label from './atoms/Label';
import LinkButton from './atoms/LinkButton';
import PageExplanation from './molecules/PageExplanation';
import User from '../models/User';
import ContentList from './organisms/ContentList';
import NewsList from './organisms/NewsList';
import { routes } from '../constants/routes';


const propTypes = {
  currentUser: PropTypes.instanceOf(User).isRequired,
  newsList: PropTypes.instanceOf(List).isRequired,
  newContents: PropTypes.instanceOf(List).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    setContent: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
  }).isRequired
};

class Activity extends React.Component {
  onClickContent = (content) => {
    this.props.actions.setContent(content);
  }

  onClickUser = (user) => {
    this.props.actions.setUser(User.fromJS(user));
  }

  render() {
    const { currentUser, newsList, newContents } = this.props;
    const floatStyle = { float: "right" }; // eslint-disable-line quote-props

    return (
      <div>
        <PageExplanation
          Icon={HomeSharp}
          title="ホーム"
          explanation={currentUser.id ? "" : (
            <LinkButton to={routes.login} style={floatStyle}>
              ログイン / 会員登録画面へ
            </LinkButton>
          )}
        />
        <NewsList newsList={newsList} />
        <Label>最新の問題</Label>
        <ContentList contents={newContents} />
      </div>
    );
  }
}

Activity.propTypes = propTypes;

export default Activity;
