import { UseMutationResult } from '@tanstack/react-query';

import { ISignUp } from '../../interfaces/services/users';
import { useMutate } from '../../hooks';
import { IError, IMessage } from '../../interfaces';

export const SignUp = (): UseMutationResult<IMessage, IError, ISignUp, unknown> => {
  const response = useMutate<ISignUp>({
    url: '/sign-up',
    method: 'POST',
  });

  return response;
};
