import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import UserIcon from '../atoms/UserIcon';
import LinkListItem from '../atoms/LinkListItem';
import Tags from './Tags';
import Content from '../../models/Content';
import { setContent as setContentAction } from '../../actions/contents';
import { routes } from '../../constants/routes';
import { contentTypes } from '../../constants/contentTypes';


const propTypes = {
  content: PropTypes.instanceOf(Content).isRequired,
  renderButtons: PropTypes.func,
};

const ContentCard = ({ content, renderButtons }) => {
  const dispatch = useDispatch();
  const setContent = () => dispatch(setContentAction(content));
  const Icon = content.contentType === contentTypes.question ? ContactSupportIcon : QuestionAnswerIcon;

  return (
    <LinkListItem
      onClick={setContent}
      to={routes.content(content.id)}
      disableTextDecoration
      unlinkedChildren={renderButtons ? renderButtons(content) : <></>}
    >
      <div className="content-card">
        <div className="card-icon-box">
          <Icon fontSize="large" />
        </div>
        <div className="card-content">
          <div className="card-top-row">
            {content.title}
          </div>
          <div>
            <UserIcon user={content.user} />
            <span>
              <Tags tags={content.tags} />
            </span>
          </div>
          <div className="card-bottom-row">
            {content.createdAt}
          </div>
        </div>
      </div>
    </LinkListItem>
  );
};

ContentCard.propTypes = propTypes;
export default ContentCard;
