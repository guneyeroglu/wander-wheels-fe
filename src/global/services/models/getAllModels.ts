import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IGetResponse } from '../../interfaces';
import { IModel } from '../../interfaces/services/models';

export const GetAllModels = (): UseQueryResult<IGetResponse<IModel[]>, Error> => {
  const response = useFetch<IModel[]>({
    queryKey: 'models',
    url: '/models',
  });

  return response;
};
