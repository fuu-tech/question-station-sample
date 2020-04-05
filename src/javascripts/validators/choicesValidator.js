export const validateChoices = (values) => {
  const errorObj = {};
  const choices = values.uniq('value').compact('value');

  if (choices.length < 2) errorObj.base = "選択肢は二種類以上設定してください";

  const answerNum = choices.filter(choice => choice.isAnswer).length;
  if (answerNum <= 0) errorObj.base = "正答は一つ以上設定してください";
  if (answerNum >= choices.length) errorObj.base = "誤答は一つ以上設定してください";

  return errorObj;
};
