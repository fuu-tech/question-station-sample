import { decamelizeKeys } from 'humps';


export const generateUrl = (basePath, params = {}) => {
  const paramsArr = Object.entries(decamelizeKeys(params)).filter(
    param => typeof param[1] === 'number' || param[1],
  );
  if (!paramsArr.length) return basePath;

  return basePath + paramsArr.reduce(
    (str, [key, val]) => `${str}${key}=${val}&`,
    "?",
  ).slice(0, -1);
};
