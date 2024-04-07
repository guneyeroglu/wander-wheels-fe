import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IGetResponse } from '../../interfaces';
import { ITransmission } from '../../interfaces/services/transmissions';

export const GetAllTransmissions = (): UseQueryResult<IGetResponse<ITransmission[]>, Error> => {
  const response = useFetch<ITransmission[]>({
    queryKey: 'transmissions',
    url: '/transmissions',
  });

  return response;
};
