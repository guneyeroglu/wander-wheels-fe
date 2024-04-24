import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks';
import { IGetResponse } from '../../interfaces';
import { ICity, ICityId } from '../../interfaces/services/cities';

interface IProps extends ICityId {
  options?: any;
}

export const GetCityById = (props: IProps): UseQueryResult<IGetResponse<ICity>, Error> => {
  const { cityId, options } = props;
  const response = useFetch<ICity>({
    queryKey: 'carById',
    url: `/cars/${cityId}`,
    method: 'GET',
    options,
  });

  return response;
};
