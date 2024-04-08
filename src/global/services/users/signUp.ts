import { UseMutationResult } from '@tanstack/react-query';

import { ISignUp } from '../../interfaces/services/users';
import { useMutate } from '../../hooks';

export const SignUp = (): UseMutationResult<unknown, Error, ISignUp, unknown> => {
  const response = useMutate<ISignUp>({
    url: '/sign-up',
    method: 'POST',
  });

  return response;
};
