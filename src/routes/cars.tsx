import { createFileRoute } from '@tanstack/react-router';

import { Cars } from '../pages';

export const Route = createFileRoute('/cars')({
  component: Cars,
});
