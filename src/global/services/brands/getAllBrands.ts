import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IError, IGetResponse } from '../../interfaces';
import { IBrand } from '../../interfaces/services/brands';

export const GetAllBrands = (): UseQueryResult<IGetResponse<IBrand[]>, IError> => {
  const response = useFetch<IBrand[]>({
    queryKey: 'brands',
    url: '/brands',
  });

  return response;
};
