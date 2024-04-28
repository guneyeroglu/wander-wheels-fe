import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IError, IGetResponse } from '../../interfaces';
import { IFuel } from '../../interfaces/services/fuels';

interface IProps {
  options?: any;
}

export const GetAllFuels = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<IFuel[]>, IError> => {
  const { options } = props;

  const response = useFetch<IFuel[]>({
    queryKey: 'fuels',
    url: '/fuels',
    options,
  });

  return response;
};
