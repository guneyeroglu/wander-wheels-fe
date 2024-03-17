import { FC, useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import {
  Heart,
  User,
  Car as CarIcon,
  CurrencyDollar,
  GasPump,
  Circle,
} from '@phosphor-icons/react';
import moment from 'moment';

import { ICar } from '../../global/interfaces';

const Car: FC<Omit<ICar, 'updatedDate'>> = ({
  id,
  brand,
  model,
  year,
  hourPrice,
  color,
  image,
  transmission,
  fuelType,
  seat,
  avaliable,
  createdDate,
}) => {
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const isNew: boolean = moment(new Date()).diff(createdDate, 'day') <= 5;
  const colorText: string = `${color.text.substring(0, 1).toUpperCase()}${color.text.substring(1)}`;

  const handleFavoriteStatus = (): void => setIsFavorite((preValue: boolean) => !preValue);

  return (
    <div key={id} className='p-2 w-1/2'>
      <Card shadow='sm'>
        <CardHeader className='flex flex-col items-start justify-center'>
          <div className='w-full flex items-center justify-between mb-4'>
            <div className='flex items-center justify-start gap-2'>
              {isNew && <Chip color='warning'>{t('car.new')}</Chip>}
              {avaliable && <Chip color='success'>{t('car.avaliable')}</Chip>}
            </div>
            <div>
              <Heart
                size={24}
                className='cursor-pointer'
                weight={isFavorite ? 'fill' : 'regular'}
                onClick={handleFavoriteStatus}
              />
            </div>
          </div>
          <h3 className='text-3xl font-medium text-neutral-200'>{`${brand} ${model}`}</h3>
          <span className='text-xl font-normal text-neutral-200 opacity-75'>{year}</span>
        </CardHeader>
        <CardBody>
          <Image
            isBlurred
            src={image}
            alt={`${brand}-${model}`}
            className='hover:scale-105 h-full'
            classNames={{
              wrapper: 'overflow-hidden h-[250px]',
            }}
          />
        </CardBody>
        <CardFooter className='flex flex-col items-start justify-center'>
          <div className='w-full flex items-center justify-between'>
            <div className='flex items-center justify-center gap-4 overflow-visible'>
              <div className='flex items-center justify-center gap-2'>
                <User size={24} />
                <span>{seat}</span>
              </div>
              <div className='flex items-center justify-center gap-2'>
                <CarIcon size={24} />
                <span>{transmission}</span>
              </div>
              <div className='flex items-center justify-center gap-2'>
                <GasPump size={24} />
                <span>{fuelType}</span>
              </div>
              <div className='flex items-center justify-center gap-2'>
                <Circle size={24} weight='fill' fill={color.hex} />
                <span>{colorText}</span>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <CurrencyDollar size={24} />
              <span className='text-xl text-neutral-200'>
                {hourPrice.toFixed(2)}
                <span className='text-sm opacity-75'>/{t('car.hour')}</span>
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Car;
