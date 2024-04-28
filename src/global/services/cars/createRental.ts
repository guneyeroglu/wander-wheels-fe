import { UseMutationResult } from '@tanstack/react-query';

import { IRentCar } from '../../interfaces/services/cars';
import { useMutate } from '../../hooks';
import { IError, IMessage } from '../../interfaces';

export const CreateRental = (): UseMutationResult<IMessage, IError, IRentCar, unknown> => {
  const response = useMutate<IRentCar>({
    url: '/rent-car',
    method: 'POST',
  });

  return response;
};
