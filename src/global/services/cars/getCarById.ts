import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks';
import { ICarFilter, IError, IGetResponse } from '../../interfaces';
import { ICarAndId, ICarById } from '../../interfaces/services/cars';

interface IProps extends ICarById {
  options?: any;
}

export const GetCarById = (props: IProps): UseQueryResult<IGetResponse<ICarAndId>, IError> => {
  const { carAndCityId, options } = props;
  const response = useFetch<ICarAndId, ICarFilter>({
    queryKey: ['car', Number(carAndCityId)],
    url: `/cars/${carAndCityId}`,
    method: 'GET',
    options,
  });

  return response;
};
