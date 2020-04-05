import { format } from "date-fns";

import Content from "../models/Content";
import { dateFormat } from "../constants/format";


let questionContentId = 2;
let choiceId = 8;

const createQuestionContentsParams = (values) => {
  return values.map((value) => {
    questionContentId += 1;
    return {
      id: questionContentId,
      ...value,
      choices: value.choices.uniq('value').map((choice) => {
        choiceId += 1;
        return { id: choiceId, ...choice };
      }),
    };
  });
};

export const createContentNewParams = (values) => {
  const { questionContents, tags } = values;

  const content = Content.fromJS({
    ...values,
    tags: tags.uniq('value').compact('value').map((tag) => {
      return { id: tag.value, ...tag };
    }),
    question: {
      id: values.id,
      version: 1,
      questionContents: createQuestionContentsParams(questionContents),
    },
    createdAt: format(new Date(), dateFormat),
  });

  return content;
};
