import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks';
import { IError, IGetResponse } from '../../interfaces';
import { ICity, ICityId } from '../../interfaces/services/cities';

interface IProps extends ICityId {
  options?: any;
}

export const GetCityById = (props: IProps): UseQueryResult<IGetResponse<ICity>, IError> => {
  const { cityId, options } = props;
  const response = useFetch<ICity>({
    queryKey: ['city', Number(cityId)],
    url: `/cities/${cityId}`,
    method: 'GET',
    options,
  });

  return response;
};
