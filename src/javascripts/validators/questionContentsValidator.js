import { validateChoices } from './choicesValidator';
import { required } from './required';
import { extractNestedValues } from '../utils/extractNestedValues';


const requireFieldNames = Object.freeze([
  'sentence',
]);

export const validateQuestionContents = (values) => {
  const errorObj = {};

  if (values.length < 1) errorObj.base = "コンテンツを設定してください";

  values.forEach((content, index) => {
    const { choices } = content;
    const contentErrorObj = {};

    requireFieldNames.forEach((name) => {
      contentErrorObj[name] = required(content[name]);
    });

    contentErrorObj.choices = validateChoices(choices);

    errorObj[index] = contentErrorObj;
  });

  errorObj.base = Object
    .values(errorObj)
    .map(value => extractNestedValues(value).compact())
    .map((arr, index) => arr.length && `Q${index + 1}: ${arr.join(', ')}`)
    .filter(str => str)
    .join('\n');

  return errorObj;
};
