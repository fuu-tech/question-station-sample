import { camelizeKeys } from 'humps';


export const extractQueryParams = (searchStr) => {
  const queryStr = decodeURIComponent(searchStr.charAt() === '?' ? searchStr.slice(1) : searchStr);

  const result = {};
  queryStr.split('&').forEach((attr) => {
    const [key, val] = attr.split('=');
    result[key] = val;
  });


  return camelizeKeys(result);
};
