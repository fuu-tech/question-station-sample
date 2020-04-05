const invalidStrArr = ['', ' ', '　'];

export function required(value) {
  if (value === null || value === undefined || invalidStrArr.includes(value)) {
    return "入力してください";
  }
  return null;
}

export function requiredArray(value) {
  if (value === null || value === undefined || value.length === 0) {
    return "入力してください";
  }
  return null;
}
