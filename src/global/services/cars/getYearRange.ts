import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks';
import { IGetResponse } from '../../interfaces';
import { IYears } from '../../interfaces/services/cars';

interface IProps {
  options?: any;
}

export const GetYearRange = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<IYears>, Error> => {
  const { options } = props;
  const response = useFetch<IYears>({
    queryKey: 'yearRange',
    url: '/year-range',
    method: 'GET',
    options,
  });

  return response;
};
