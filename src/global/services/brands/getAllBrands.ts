import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IError, IGetResponse } from '../../interfaces';
import { IBrand } from '../../interfaces/services/brands';

interface IProps {
  options?: any;
}

export const GetAllBrands = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<IBrand[]>, IError> => {
  const { options } = props;

  const response = useFetch<IBrand[]>({
    queryKey: ['brands'],
    url: '/brands',
    options,
  });

  return response;
};
