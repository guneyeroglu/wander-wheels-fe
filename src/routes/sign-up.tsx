import { createFileRoute } from '@tanstack/react-router';

import { SignUp } from '../pages';

export const Route = createFileRoute('/sign-up')({
  component: SignUp,
});
