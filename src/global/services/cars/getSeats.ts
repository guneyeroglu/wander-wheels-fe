import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks';
import { IGetResponse } from '../../interfaces';
import { ISeats } from '../../interfaces/services/cars';

interface IProps {
  options?: any;
}

export const GetSeats = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<ISeats>, Error> => {
  const { options } = props;
  const response = useFetch<ISeats>({
    queryKey: 'seats',
    url: '/seats',
    method: 'GET',
    options,
  });

  return response;
};
