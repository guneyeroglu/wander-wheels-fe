import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { instance } from '../interceptors';
import { IError, IGetResponse } from '../interfaces';

interface IProps<T> {
  method?: 'GET' | 'POST';
  queryKey: [string] | [string, number];
  url: string;
  data?: T;
  options?: any;
}

export const useFetch = <T, F = unknown>(
  props: IProps<F>,
): UseQueryResult<IGetResponse<T>, IError> => {
  const { method = 'GET', queryKey, url, data, options } = props;

  const fetchData = async () => {
    const res = await instance(url, {
      method,
      data,
    }).then(res => res.data);
    return res;
  };

  const queryStates = useQuery<IGetResponse<T>, IError>({
    queryKey,
    queryFn: fetchData,
    retry: 0,
    ...options,
  });

  return queryStates;
};
