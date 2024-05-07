import { UseQueryResult } from '@tanstack/react-query';

import { ILogin, IUser } from '../../interfaces/services/users';
import { useFetch } from '../../hooks';
import { IError, IGetResponse } from '../../interfaces';
import { AxiosError } from 'axios';

interface IProps {
  options?: any;
}

export const GetUserInfo = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<IUser>, IError> => {
  const { options } = props;

  const response = useFetch<IUser, ILogin>({
    queryKey: ['userInfo'],
    url: '/user-info',
    method: 'GET',
    options: {
      throwOnError: (e: AxiosError) => {
        if (e.response?.status === 422) {
          localStorage.removeItem('token');
        }
      },
      ...options,
    },
  });

  return response;
};
