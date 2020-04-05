import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { finishAnswerHistory } from '../../actions/histories';
import SubmitButtonBlock from '../molecules/SubmitButtonBlock';
import AnswerHistory from '../../models/AnswerHistory';
import { routes } from '../../constants/routes';


const propTypes = {
  answerHistory: PropTypes.instanceOf(AnswerHistory),
};

const QuestionAnswerSubmitButton = ({ answerHistory }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = () => {
    dispatch(finishAnswerHistory(answerHistory));
    history.replace(routes.answerHistoryShow(answerHistory.id));
  };

  return <SubmitButtonBlock onClick={onSubmit}>提出</SubmitButtonBlock>;
};

QuestionAnswerSubmitButton.propTypes = propTypes;
export default QuestionAnswerSubmitButton;
