import { createFileRoute } from '@tanstack/react-router';

import { mockData } from '../global/constants';
import { CarDetails } from '../pages';
import { ICar } from '../global/interfaces';

export const Route = createFileRoute('/car-details/$carId')({
  component: CarDetails,
  loader: async ({ params }) => {
    const foundCar: ICar | undefined = await mockData.find((car: ICar) => car.id === params.carId);

    return foundCar;
  },
});
