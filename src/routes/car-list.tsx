import { ParsedLocation, createFileRoute } from '@tanstack/react-router';

import { ICar, ICarListSearch } from '../global/interfaces';
import { CarList } from '../pages';
import { mockData } from '../global/constants';

export const Route = createFileRoute('/car-list')({
  component: CarList,
  loader: async ({ location: locationParam }) => {
    const { search } = locationParam as ParsedLocation<ICarListSearch>;
    const { startDate, endDate, location } = search;

    console.log({ startDate, endDate, location });

    const filteredData: ICar[] = await mockData;

    return filteredData;
  },
});
