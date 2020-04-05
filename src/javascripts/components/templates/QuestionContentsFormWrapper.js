import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import QuestionContentsForm from '../forms/QuestionContentsForm';
import { updateQuestion } from '../../actions/contents';
import { useFormValues } from '../../hooks/useReduxForm';
import { routes } from '../../constants/routes';
import { isNullObj } from '../../utils/isNullObj';
import { requestApi } from '../../usecases/requestApi';


const contentSelector = state => state.contents.get('content');
const isMobileSelector = state => state.options.get('isMobile');

const QuestionContentsFormWrapper = () => {
  const formValues = useFormValues("questionContentsForm");
  const content = useSelector(contentSelector);
  const isMobile = useSelector(isMobileSelector);
  const history = useHistory();

  const onSubmit = (values, _, { syncErrors }) => {
    if (!isNullObj(syncErrors)) return;

    requestApi(updateQuestion(content.id, content.question.id, values), (res, successAlert) => {
      successAlert('問題を編集しました');
      history.push(routes.content(content.id));
    });
  };

  return (
    <QuestionContentsForm
      formValues={formValues}
      onSubmit={onSubmit}
      isMobile={isMobile}
      initialValues={{
        questionContents: content.question.questionContents.toJS(),
      }}
    />
  );
};

export default QuestionContentsFormWrapper;
