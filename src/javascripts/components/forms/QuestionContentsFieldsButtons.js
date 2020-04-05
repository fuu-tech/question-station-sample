import React from 'react';
import PropTypes from 'prop-types';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

import Button from '../atoms/Button';
import { initialQuestionContentValues } from '../../constants/initialValues';


const propTypes = {
  contentIndex: PropTypes.number.isRequired,
  move: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    length: PropTypes.number.isRequired,
    push: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    swap: PropTypes.func.isRequired,
  }).isRequired,
};

const QuestionContentsFieldsButtons = ({ move, contentIndex, fields }) => {
  const onClickBefore = () => {
    move(contentIndex - 1);
  };

  const onClickNext = () => {
    move(contentIndex + 1);
  };

  const onClickDelete = () => {
    if (contentIndex === fields.length - 1) onClickBefore();
    fields.remove(contentIndex);
  };

  const onClickAdd = () => {
    fields.push(initialQuestionContentValues);
    move(fields.length, true);
  };

  const onClickSwapBefore = () => {
    fields.swap(contentIndex, contentIndex - 1);
    onClickBefore();
  };

  const onClickSwapNext = () => {
    fields.swap(contentIndex, contentIndex + 1);
    onClickNext();
  };

  return (
    <div className="question-contents-fields-buttons">
      <div className="question-contents-fields-culumn-buttons">
        <Button onClick={onClickSwapBefore} disabled={!contentIndex}>
          <SwapHorizIcon />
        </Button>
        <Button onClick={onClickBefore} disabled={!contentIndex}>
          前へ
        </Button>
      </div>
      <div>
        <Button onClick={onClickDelete} disabled={fields.length <= 1}>
          削除
        </Button>
        <Button onClick={onClickAdd} disabled={fields.length >= 30}>
          追加
        </Button>
      </div>
      <div className="question-contents-fields-culumn-buttons">
        <Button onClick={onClickSwapNext} disabled={contentIndex >= fields.length - 1}>
          <SwapHorizIcon />
        </Button>
        <Button onClick={onClickNext} disabled={contentIndex >= fields.length - 1}>
          次へ
        </Button>
      </div>
    </div>
  );
};

QuestionContentsFieldsButtons.propTypes = propTypes;
export default QuestionContentsFieldsButtons;
