import moment from 'moment';

const isNumber = (num: any): boolean => {
  return typeof num === 'number' && !isNaN(num);
};

const isDate = (stringDate: string): boolean => {
  return !isNaN(Date.parse(stringDate)) && stringDate.includes('T');
};

const isNew = (date: Undefinedable<Date>): boolean => {
  if (!date) {
    return false;
  }

  return moment().diff(date, 'day') <= 10;
};

const dayCount = (firstDate: Undefinedable<Date>, secondDate: Undefinedable<Date>): number => {
  if (!firstDate || !secondDate) {
    return 1;
  }

  return moment(firstDate).diff(secondDate, 'day');
};

export const utils = {
  isNumber,
  isDate,
  isNew,
  dayCount,
};
