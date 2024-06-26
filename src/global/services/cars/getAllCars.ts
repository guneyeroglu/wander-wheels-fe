import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks';
import { ICarFilter, IError, IGetResponse } from '../../interfaces';
import { ICarAndId } from '../../interfaces/services/cars';

interface IProps extends ICarFilter {
  options?: any;
}

export const GetAllCars = (props: IProps): UseQueryResult<IGetResponse<ICarAndId[]>, IError> => {
  const { options, ...rest } = props;
  const response = useFetch<ICarAndId[], ICarFilter>({
    queryKey: ['cars'],
    url: '/cars',
    data: {
      ...rest,
    },
    method: 'POST',
    options,
  });

  return response;
};
