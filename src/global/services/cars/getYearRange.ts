import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks';
import { IError, IGetResponse } from '../../interfaces';
import { IYears } from '../../interfaces/services/cars';

interface IProps {
  options?: any;
}

export const GetYearRange = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<IYears>, IError> => {
  const { options } = props;
  const response = useFetch<IYears>({
    queryKey: 'yearRange',
    url: '/year-range',
    method: 'GET',
    options,
  });

  return response;
};
