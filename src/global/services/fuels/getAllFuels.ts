import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IError, IGetResponse } from '../../interfaces';
import { IFuel } from '../../interfaces/services/fuels';

export const GetAllFuels = (): UseQueryResult<IGetResponse<IFuel[]>, IError> => {
  const response = useFetch<IFuel[]>({
    queryKey: 'fuels',
    url: '/fuels',
  });

  return response;
};
