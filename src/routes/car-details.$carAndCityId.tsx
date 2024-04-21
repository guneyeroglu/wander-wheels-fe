import { createFileRoute } from '@tanstack/react-router';

import { CarDetails } from '../pages';

export const Route = createFileRoute('/car-details/$carAndCityId')({
  component: CarDetails,
});
