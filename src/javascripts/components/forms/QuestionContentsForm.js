import PropTypes from 'prop-types';
import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';

import SubmitButtonBlock from '../molecules/SubmitButtonBlock';
import QuestionContentsFields from './QuestionContentsFields';
import { validateQuestionContentEditForm } from '../../validators/contentValidator';


const propTypes = {
  isMobile: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

const QuestionContentsForm = ({ isMobile, handleSubmit, change }) => (
  <form onSubmit={handleSubmit}>
    <FieldArray
      name="questionContents"
      component={QuestionContentsFields}
      isMobile={isMobile}
      change={change}
    />
    <SubmitButtonBlock>保存</SubmitButtonBlock>
  </form>
);

QuestionContentsForm.propTypes = propTypes;
export default reduxForm({
  form: 'questionContentsForm',
  validate: validateQuestionContentEditForm,
})(QuestionContentsForm);
