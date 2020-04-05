import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from './Button';
import Content from '../../models/Content';
import { createAnswerHistory } from '../../actions/histories';
import { routes } from '../../constants/routes';


const propTypes = {
  content: PropTypes.instanceOf(Content).isRequired,
  children: PropTypes.string.isRequired,
};

const TryButton = ({ content, children, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onClickTry = () => {
    dispatch(createAnswerHistory(content));
    history.push(routes.questionAnswer(content.id));
  };

  return <Button onClick={onClickTry} {...props}>{children}</Button>;
};

TryButton.propTypes = propTypes;
export default TryButton;
