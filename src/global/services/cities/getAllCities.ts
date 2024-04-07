import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IGetResponse } from '../../interfaces';
import { ICity } from '../../interfaces/services/cities';

export const GetAllCities = (): UseQueryResult<IGetResponse<ICity[]>, Error> => {
  const response = useFetch<ICity[]>({
    queryKey: 'cities',
    url: '/cities',
  });

  return response;
};
