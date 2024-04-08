import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { instance } from '../interceptors';

interface IProps {
  method?: 'POST' | 'PUT' | 'DELETE';
  url: string;
}

export const useMutate = <T>(props: IProps): UseMutationResult<unknown, Error, T, unknown> => {
  const { method = 'POST', url } = props;

  const setData = async (data: T) => {
    const res = await instance(url, {
      method,
      data,
    }).then(res => res.data);

    return res;
  };

  const queryStates = useMutation({
    mutationFn: (data: T) => setData(data),
  });

  return queryStates;
};
