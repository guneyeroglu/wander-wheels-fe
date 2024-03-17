import { FC, useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Link,
} from '@nextui-org/react';
import { Trans, useTranslation } from 'react-i18next';
import {
  Heart,
  Car as CarIcon,
  CurrencyDollar,
  GasPump,
  Circle,
  UsersThree,
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
  const [isHoveredFavorite, setIsHoveredFavorite] = useState<boolean>(false);

  const isNew: boolean = moment(new Date()).diff(createdDate, 'day') <= 5;

  const handleFavoriteStatus = (): void => setIsFavorite((preValue: boolean) => !preValue);
  const handleMouseEnterFavorite = (): void => setIsHoveredFavorite(true);
  const handleMouseLeaveFavorite = (): void => setIsHoveredFavorite(false);

  return (
    <div key={id} className='p-2 w-1/2 h-full relative'>
      <Heart
        size={24}
        className='cursor-pointer absolute right-5 top-6 z-20'
        weight={isFavorite || isHoveredFavorite ? 'fill' : 'regular'}
        onClick={handleFavoriteStatus}
        onMouseEnter={handleMouseEnterFavorite}
        onMouseLeave={handleMouseLeaveFavorite}
      />
      <Link className='w-full h-full cursor-pointer' href={`/car/${id}`}>
        <Card
          isHoverable
          shadow='sm'
          className='border-t-1.5 border-b-1.5 border-neutral-600 border-solid hover:shadow-large hover:border-neutral-200'
        >
          <CardHeader className='flex flex-col items-start justify-center'>
            <div className='w-full flex items-center justify-start mb-4'>
              <div className='flex items-center justify-start gap-2'>
                {isNew && (
                  <Chip className='cursor-default' color='warning'>
                    {t('car.new')}
                  </Chip>
                )}
                <Chip
                  className='cursor-default'
                  color={avaliable.status ? 'success' : 'default'}
                  isDisabled={!avaliable.status}
                >
                  {avaliable.status ? (
                    t('car.avaliable')
                  ) : (
                    <Trans
                      defaults={t('car.blockedTill', {
                        date: moment(avaliable.date).format('DD.MM.YYYY'),
                      })}
                    />
                  )}
                </Chip>
              </div>
            </div>
            <h3 className='text-3xl font-medium text-neutral-200'>{`${brand} ${model}`}</h3>
            <span className='text-xl font-normal text-neutral-200 opacity-75'>{year}</span>
          </CardHeader>
          <CardBody className='overflow-hidden'>
            <Image
              isBlurred
              src={image}
              alt={`${brand}-${model}`}
              className='hover:scale-105 h-full'
              classNames={{
                wrapper: 'overflow-hidden max-h-[280px] w-full h-full rounded-large',
              }}
            />
          </CardBody>
          <Divider className='h-[1.5px] bg-neutral-600' />
          <CardFooter className='flex flex-col items-start justify-center'>
            <div className='w-full'>
              <span className='block w-full text-left mb-2 opacity-75'>{t('common.features')}</span>
              <div className='flex flex-wrap items-center justify-start gap-4 overflow-visible mb-4'>
                <div className='flex items-center justify-center gap-2'>
                  <UsersThree size={24} />
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
                  <span>{color.text}</span>
                </div>
              </div>
              <div className='flex items-center justify-end '>
                <CurrencyDollar size={24} />
                <span className='text-xl text-neutral-200'>
                  {hourPrice.toFixed(2)}
                  <span className='text-sm opacity-75'>/{t('car.hour')}</span>
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default Car;
