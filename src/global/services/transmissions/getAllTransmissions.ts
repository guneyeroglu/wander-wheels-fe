import { UseQueryResult } from '@tanstack/react-query';

import { useFetch } from '../../hooks/useFetch';
import { IError, IGetResponse } from '../../interfaces';
import { ITransmission } from '../../interfaces/services/transmissions';

interface IProps {
  options?: any;
}

export const GetAllTransmissions = (
  props: IProps = { options: {} },
): UseQueryResult<IGetResponse<ITransmission[]>, IError> => {
  const { options } = props;

  const response = useFetch<ITransmission[]>({
    queryKey: 'transmissions',
    url: '/transmissions',
    options,
  });

  return response;
};
