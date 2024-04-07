import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IGetResponse } from '../../interfaces';
import { IUser } from '../../interfaces/services/users';

export const GetAllUsers = (): UseQueryResult<IGetResponse<IUser[]>, Error> => {
  const response = useFetch<IUser[]>({
    queryKey: 'users',
    url: '/users',
  });

  return response;
};
