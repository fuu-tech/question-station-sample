import { validateQuestionContents } from './questionContentsValidator';
import { required } from './required';
import { contentTypes } from '../constants/contentTypes';


const requireFieldNames = Object.freeze([
  'title',
  'contentType',
]);

export const validateContentNewForm = (values) => {
  const errorObj = {};
  const { contentType, questionContents } = values;

  requireFieldNames.forEach((name) => {
    errorObj[name] = required(values[name]);
  });

  if (contentType === contentTypes.question) {
    errorObj.questionContents = validateQuestionContents(questionContents);
  }

  return errorObj;
};

export const validateQuestionContentEditForm = (values) => {
  const errorObj = {};
  const { questionContents } = values;

  errorObj.questionContents = validateQuestionContents(questionContents || []);

  return errorObj;
};
