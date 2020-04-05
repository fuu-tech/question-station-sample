/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from "react-i18next";

import LinkButton from './atoms/LinkButton';
import MarkDown from './atoms/MarkDown';
import ContentInfo from './organisms/ContentInfo';
import Question from './templates/Question';
import User from '../models/User';
import ContentModel from '../models/Content';
import { contentTypes } from '../constants/contentTypes';
import { routes } from '../constants/routes';


const propTypes = {
  currentUser: PropTypes.instanceOf(User).isRequired,
  content: PropTypes.instanceOf(ContentModel).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  actions: PropTypes.shape({
    updateDisplayedContent: PropTypes.func.isRequired,
  }).isRequired,
};

class Content extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params }, actions: { updateDisplayedContent } } = props;
    updateDisplayedContent(Number(params.id));
  }

  render() {
    const { currentUser, content } = this.props;

    if (!content.id) return <div>問題が存在していません</div>;

    let contentComponent;
    if (currentUser.id) {
      if (content.contentType === contentTypes.question) {
        contentComponent = <Question />;
      }
    } else {
      contentComponent = (
        <div className="try-button-container">
          <LinkButton to={routes.login}>ログインして参加</LinkButton>
        </div>
      );
    }

    return (
      <div className="content-container">
        <ContentInfo content={content} />
        <div className="markdown-padding-container">
          <MarkDown sentence={content.explanation} />
        </div>
        {contentComponent}
      </div>
    );
  }
}

Content.propTypes = propTypes;
export default withTranslation(["model"])(Content);
