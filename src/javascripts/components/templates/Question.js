import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import TryButton from '../atoms/TryButton';


const propTypes = {
};

const contentSelector = state => state.contents.get('content');

const Question = () => {
  const content = useSelector(contentSelector);

  return (
    <div className="try-button-container">
      <TryButton content={content}>
        トライ
      </TryButton>
    </div>
  );
};

Question.propTypes = propTypes;
export default Question;
