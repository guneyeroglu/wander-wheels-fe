import { UseQueryResult } from '@tanstack/react-query';

import { ILogin, IUser } from '../../interfaces/services/users';
import { useFetch } from '../../hooks';
import { IGetResponse } from '../../interfaces';

interface IProps {
  options?: any;
}

export const GetUserInfo = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<IUser>, Error> => {
  const response = useFetch<IUser, ILogin>({
    queryKey: 'userInfo',
    url: '/user-info',
    method: 'GET',
    options: props.options,
  });

  return response;
};
