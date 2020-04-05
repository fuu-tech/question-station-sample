import { set } from 'date-fns';

import { parseTimeStrToDate } from './parseTimeStrToDate';

export const createDateTime = (dt, tm) => {
  const dateTime = (new Date(dt)).setSeconds(0);
  if (typeof tm === "string") return parseTimeStrToDate(tm, dateTime);
  const time = new Date(tm);
  return set(dateTime, { hours: time.getHours(), minutes: time.getMinutes() });
};
