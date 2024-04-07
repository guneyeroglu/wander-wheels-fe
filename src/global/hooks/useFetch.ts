import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { instance } from '../interceptors';
import { IGetResponse } from '../interfaces';

interface IProps {
  method?: 'GET' | 'POST';
  queryKey: string;
  url: string;
}

export const useFetch = <T>(props: IProps): UseQueryResult<IGetResponse<T>, Error> => {
  const { method = 'GET', queryKey, url } = props;

  const fetchData = async () => {
    const res = await instance(url, {
      method,
    }).then(res => res.data);

    return res;
  };

  const queryStates = useQuery<IGetResponse<T>>({
    queryKey: [queryKey],
    queryFn: fetchData,
  });

  return queryStates;
};
