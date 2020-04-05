export const objFilter = (obj, checkList = []) => {
  const result = {};

  const allowedKeys = checkList.filter(
    ([key, checkFunc]) => obj[key] !== undefined && (!checkFunc || checkFunc(obj[key], obj))
  ).map(arr => arr[0]);

  allowedKeys.forEach((key) => {
    result[key] = obj[key];
  });

  return result;
};
