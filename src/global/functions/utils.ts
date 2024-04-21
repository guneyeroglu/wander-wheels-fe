const isNumber = (param: any): boolean => {
  return typeof param === 'number' && !isNaN(param);
};

const isDate = (param: string): boolean => {
  return !isNaN(Date.parse(param)) && param.includes('T') && param.includes('Z');
};

export const utils = {
  isNumber,
  isDate,
};
