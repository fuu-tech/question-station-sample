/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import PropTypes from 'prop-types';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import InfoBlock from '../molecules/InfoBlock';
import ContentModel from '../../models/Content';
import { contentTypes } from '../../constants/contentTypes';


const propTypes = {
  content: PropTypes.instanceOf(ContentModel).isRequired,
};

const ContentInfo = ({ content }) => {
  const Icon = content.contentType === contentTypes.question ? ContactSupportIcon : QuestionAnswerIcon;

  return (
    <InfoBlock
      content={content}
      Icon={<Icon fontSize="large" />}
      Buttons={<></>}
    />
  );
};

ContentInfo.propTypes = propTypes;
export default ContentInfo;
