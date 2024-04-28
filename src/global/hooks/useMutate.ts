import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { useSnackbarInfo } from '../../store';
import { IError, IMessage } from '../interfaces';
import { instance } from '../interceptors';

interface IProps {
  method?: 'POST' | 'PUT' | 'DELETE';
  url: string;
}

export const useMutate = <T>(props: IProps): UseMutationResult<IMessage, IError, T, unknown> => {
  const { method = 'POST', url } = props;
  const { setSnackbar } = useSnackbarInfo();

  const setData = async (data: T) => {
    const res = await instance(url, {
      method,
      data,
    }).then(res => res.data);

    return res;
  };

  const queryStates = useMutation({
    mutationFn: (data: T) => setData(data),
    onSuccess: (e: IMessage) => {
      setSnackbar({
        open: true,
        title: e.message,
        state: 'success',
      });
    },
    onError: (e: IError) => {
      setSnackbar({
        open: true,
        title: e.response.data.message,
        state: 'danger',
      });
    },
  });

  return queryStates;
};
