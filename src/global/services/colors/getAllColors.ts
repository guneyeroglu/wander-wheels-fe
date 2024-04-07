import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IGetResponse } from '../../interfaces';
import { IColor } from '../../interfaces/services/colors';

export const GetAllColors = (): UseQueryResult<IGetResponse<IColor[]>, Error> => {
  const response = useFetch<IColor[]>({
    queryKey: 'colors',
    url: '/colors',
  });

  return response;
};
