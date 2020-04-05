import { parse } from 'date-fns';

import { timeFormat } from '../constants/format';


export const parseTimeStrToDate = (time, date = new Date()) => {
  return parse(time, timeFormat, date);
};
