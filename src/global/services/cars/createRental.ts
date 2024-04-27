import { UseMutationResult } from '@tanstack/react-query';

import { IRentCar } from '../../interfaces/services/cars';
import { useMutate } from '../../hooks';

export const CreateRental = (): UseMutationResult<unknown, Error, IRentCar, unknown> => {
  const response = useMutate<IRentCar>({
    url: '/rent-car',
    method: 'POST',
  });

  return response;
};
