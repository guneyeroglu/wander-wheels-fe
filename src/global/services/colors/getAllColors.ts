import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IError, IGetResponse } from '../../interfaces';
import { IColor } from '../../interfaces/services/colors';

interface IProps {
  options?: any;
}

export const GetAllColors = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<IColor[]>, IError> => {
  const { options } = props;

  const response = useFetch<IColor[]>({
    queryKey: ['colors'],
    url: '/colors',
    options,
  });

  return response;
};
