import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks';
import { IError, IGetResponse } from '../../interfaces';
import { ISeats } from '../../interfaces/services/cars';

interface IProps {
  options?: any;
}

export const GetSeats = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<ISeats>, IError> => {
  const { options } = props;
  const response = useFetch<ISeats>({
    queryKey: 'seats',
    url: '/seats',
    method: 'GET',
    options,
  });

  return response;
};
