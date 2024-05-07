import { UseQueryResult } from '@tanstack/react-query';

import { ILogin, ISignUp } from '../../interfaces/services/users';
import { useFetch } from '../../hooks';
import { IError, IGetResponse } from '../../interfaces';

type Data = Omit<ISignUp, 'mail'>;
interface IProps extends Data {
  options?: any;
}

export const Login = (props: IProps): UseQueryResult<IGetResponse<ILogin>, IError> => {
  const { options, ...rest } = props;

  const response = useFetch<ILogin, Data>({
    queryKey: ['login'],
    url: '/login',
    data: {
      ...rest,
    },
    method: 'POST',
    options,
  });

  return response;
};
