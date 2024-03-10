import { createFileRoute } from '@tanstack/react-router';

import { CarList } from '../pages';

export const Route = createFileRoute('/car-list')({
  component: CarList,
});
