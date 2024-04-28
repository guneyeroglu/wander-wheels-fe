import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IError, IGetResponse } from '../../interfaces';
import { IModel } from '../../interfaces/services/models';

interface IProps {
  options?: any;
}

export const GetAllModels = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<IModel[]>, IError> => {
  const { options } = props;

  const response = useFetch<IModel[]>({
    queryKey: 'models',
    url: '/models',
    options,
  });

  return response;
};
