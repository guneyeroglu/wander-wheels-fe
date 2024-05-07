import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks';
import { IError, IGetResponse } from '../../interfaces';
import { IPrices } from '../../interfaces/services/cars';

interface IProps {
  options?: any;
}

export const GetPriceRange = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<IPrices>, IError> => {
  const { options } = props;
  const response = useFetch<IPrices>({
    queryKey: ['priceRange'],
    url: '/price-range',
    method: 'GET',
    options,
  });

  return response;
};
