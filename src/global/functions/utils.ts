import moment from 'moment';

const isNumber = (param: any): boolean => {
  return typeof param === 'number' && !isNaN(param);
};

const isDate = (param: string): boolean => {
  return !isNaN(Date.parse(param)) && param.includes('T');
};

const isNew = (param: Date | undefined): boolean => {
  if (!param) {
    return false;
  }

  return moment().diff(param, 'day') <= 10;
};

export const utils = {
  isNumber,
  isDate,
  isNew,
};
