import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks';
import { ICarFilter, IGetResponse } from '../../interfaces';
import { ICarAndId, ICarById } from '../../interfaces/services/cars';

interface IProps extends ICarById {
  options?: any;
}

export const GetCarById = (props: IProps): UseQueryResult<IGetResponse<ICarAndId>, Error> => {
  const { carAndCityId, options } = props;
  const response = useFetch<ICarAndId, ICarFilter>({
    queryKey: 'carById',
    url: `/cars/${carAndCityId}`,
    method: 'GET',
    options: options,
  });

  return response;
};
