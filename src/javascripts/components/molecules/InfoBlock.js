import React from 'react';
import PropTypes from 'prop-types';

import LinkUserIcon from '../atoms/LinkUserIcon';
import LinkTag from '../atoms/LinkTag';
import Content from '../../models/Content';
import { contentTypes } from '../../constants/contentTypes';


const propTypes = {
  content: PropTypes.instanceOf(Content).isRequired,
  Icon: PropTypes.node.isRequired,
  Buttons: PropTypes.node.isRequired,
};

const InfoBlock = ({ content, Icon, Buttons }) => {
  const { question } = content;

  return (
    <div className="content-header">
      <div className="content-title-container">
        <div>{Icon}</div>
        <div className="content-title">
          {content.title}
          <div className="question-info-container">
            {content.contentType === contentTypes.question && !!question.id && (
              <>
                <span>{`バージョン: ${question.version}`}</span>
                <span>
                  {`平均正答率: ${question.finishAnswerHistoryCounter
                    ? (question.totalCorrectAnswerRate / question.finishAnswerHistoryCounter).round(1) + "%" : "-"}
                  `}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        {content.tags.map(tag => <LinkTag tag={tag} key={tag.value} />)}
      </div>
      <div className="content-header-bottom-container">
        <div>
          <LinkUserIcon user={content.user} />
        </div>
        <div className="content-buttons-container">
          {Buttons}
        </div>
      </div>
    </div>
  );
};

InfoBlock.propTypes = propTypes;
export default InfoBlock;
