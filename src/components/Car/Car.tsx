import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Car as CarIcon, CurrencyDollar, GasPump, Circle, UsersThree } from '@phosphor-icons/react';
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

import { ICar } from '../../global/interfaces';
import CustomFavoriteButton from '../CustomFavoriteButton/CustomFavoriteButton';

const Car: FC<Omit<ICar, 'updatedDate'>> = ({
  id,
  brand,
  model,
  year,
  dayPrice,
  color,
  images,
  transmission,
  fuel,
  seat,
  createdDate,
}) => {
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isHoveredFavorite, setIsHoveredFavorite] = useState<boolean>(false);

  const isNew: boolean = moment().diff(createdDate, 'day') <= 5;
  const featuredImage: string = images.featured;
  const fixedDayPrice: string = dayPrice.toFixed(2);

  const handleFavoriteStatus = (): void => setIsFavorite((preValue: boolean) => !preValue);
  const onHoverStart = (): void => setIsHoveredFavorite(true);
  const onHoverEnd = (): void => setIsHoveredFavorite(false);

  const cardAttribute = isHoveredFavorite ? { ['data-hover']: true } : {};

  return (
    <div key={id} className='p-2 w-1/2 h-full relative'>
      <CustomFavoriteButton
        className='absolute right-5 top-6 z-20'
        onClick={handleFavoriteStatus}
        filled={isFavorite}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
      />

      <Link className='w-full h-full cursor-pointer hover:opacity-100' href={`/car-details/${id}`}>
        <Card
          isHoverable
          shadow='sm'
          className='w-full border-t-1.5 border-b-1.5 border-neutral-600 border-solid dark:data-[hover=true]:shadow-large dark:data-[hover=true]:border-neutral-200'
          {...cardAttribute}
        >
          <CardHeader className='flex flex-col items-start justify-center'>
            <div className='w-full flex items-center justify-start mb-4'>
              <div className='flex items-center justify-start gap-2 min-h-7'>
                {isNew && <Chip color='warning'>{t('car.new')}</Chip>}
              </div>
            </div>
            <h3 className='text-3xl font-medium text-neutral-200'>{`${brand} ${model}`}</h3>
            <span className='text-xl font-normal text-neutral-200 opacity-75'>{year}</span>
          </CardHeader>
          <CardBody className='overflow-hidden relative'>
            <Image
              isBlurred
              width={'100%'}
              height={280}
              src={featuredImage}
              alt={`${brand}-${model}`}
              className='hover:scale-105 h-[280px] object-cover object-center'
              classNames={{
                wrapper: 'overflow-hidden w-full h-full rounded-large',
              }}
            />
            <div className='flex items-center justify-center gap-2 absolute top-3 right-3 z-10 bg-neutral-800 bg-opacity-95 rounded-tr-large rounded-bl-large p-2'>
              <Circle
                size={20}
                weight='fill'
                fill={color.code}
                className='border-1.5 border-solid border-neutral-200 rounded-full'
                style={{ backgroundColor: color.code }}
              />
              <span className='text-neutral-200'>{color.text}</span>
            </div>
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
                  <span>{transmission.type}</span>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  <GasPump size={24} />
                  <span>{fuel.type}</span>
                </div>
              </div>
              <div className='flex items-center justify-left '>
                <CurrencyDollar size={32} />
                <span className='text-3xl text-neutral-100'>
                  {fixedDayPrice}
                  <span className='text-2xl opacity-75'>/{t('car.day')}</span>
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
