import { FC } from 'react';
import { useLoaderData } from '@tanstack/react-router';
import { ICar } from '../../global/interfaces';

const CarDetails: FC = () => {
  const carDetails = useLoaderData({ strict: false }) as ICar;

  return (
    <div>
      <span>Car Details {carDetails.id}</span>
    </div>
  );
};

export default CarDetails;
