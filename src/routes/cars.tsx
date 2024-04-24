import { ParsedLocation, createFileRoute } from '@tanstack/react-router';

import { IRentForm } from '../global/interfaces';
import { utils } from '../global/functions';
import { Cars } from '../pages';

export const Route = createFileRoute('/cars')({
  component: Cars,
  loader: ({ navigate, location }) => {
    const {
      search: { cityId, startDate, endDate },
    } = location as ParsedLocation<IRentForm>;

    if (!utils.isNumber(cityId)) {
      navigate({
        to: '/',
      });
    }

    if (!utils.isDate(startDate)) {
      navigate({
        to: '/',
      });
    }

    if (!utils.isDate(endDate)) {
      navigate({
        to: '/',
      });
    }

    return { cityId, startDate, endDate };
  },
});
