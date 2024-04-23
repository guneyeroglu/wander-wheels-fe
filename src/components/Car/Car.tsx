import { FC } from 'react';
import { useTranslation } from 'react-i18next';
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
  Skeleton,
} from '@nextui-org/react';

import { ICar } from '../../global/interfaces/services/cars';
import { utils } from '../../global/functions';

interface IProps {
  id: string;
  car: ICar;
  isLoaded: boolean;
}

const Car: FC<IProps> = ({ id, car, isLoaded }) => {
  const {
    id: carId,
    color,
    dailyPrice,
    fuel,
    images,
    model,
    seat,
    transmission,
    year,
    createdDate,
  } = car;
  const { t } = useTranslation();

  const isNew: boolean = utils.isNew(createdDate);
  const featuredImage: string = images.featuredImage;
  const fixedDayPrice: string = dailyPrice.toFixed(2);

  return (
    <div key={`${id}-${carId}`} className='p-2 w-1/2 h-full relative'>
      <Link className='w-full h-full cursor-pointer hover:opacity-100' href={`/car-details/${id}`}>
        <Card
          isHoverable
          shadow='sm'
          className='w-full border-t-1.5 border-b-1.5 border-neutral-600 border-solid dark:data-[hover=true]:shadow-large dark:data-[hover=true]:border-neutral-200'
        >
          <CardHeader className='flex flex-col items-start justify-center'>
            <div className='w-full flex items-center justify-between my-2 gap-2'>
              <Skeleton isLoaded={isLoaded}>
                <h3 className='text-3xl font-medium text-neutral-200'>{`${model.brand.name} ${model.name}`}</h3>
              </Skeleton>
              <Skeleton isLoaded={isLoaded}>
                {isNew && <Chip color='warning'>{t('car.new')}</Chip>}
              </Skeleton>
            </div>
            <Skeleton isLoaded={isLoaded}>
              <span className='text-xl font-normal text-neutral-200 opacity-75'>{year}</span>
            </Skeleton>
          </CardHeader>
          <CardBody className='overflow-hidden relative'>
            <Image
              isBlurred
              width={'100%'}
              height={280}
              src={featuredImage}
              alt={`${model.brand.name}-${model.name}`}
              className='hover:scale-105 h-[280px] object-cover object-center'
              classNames={{
                wrapper: 'overflow-hidden w-full h-full rounded-large',
              }}
              isLoading={!isLoaded}
            />

            {isLoaded && (
              <div className='flex items-center justify-center gap-2 absolute top-3 right-3 z-10 bg-neutral-800 bg-opacity-95 rounded-tr-large rounded-bl-large p-2'>
                <Circle
                  size={20}
                  weight='fill'
                  fill={color.code}
                  className='border-1.5 border-solid border-neutral-200 rounded-full'
                  style={{ backgroundColor: color.code }}
                />
                <span className='text-neutral-200'>{color.name}</span>
              </div>
            )}
          </CardBody>
          <Divider className='h-[1.5px] bg-neutral-600' />
          <CardFooter className='flex flex-col items-start justify-center'>
            <div className='w-full'>
              <span className='block w-full text-left mb-2 opacity-75'>{t('common.features')}</span>
              <div className='flex flex-wrap items-center justify-start gap-4 overflow-visible mb-4'>
                <Skeleton isLoaded={isLoaded}>
                  <div className='flex items-center justify-center gap-2'>
                    <UsersThree size={24} />
                    <span>{seat}</span>
                  </div>
                </Skeleton>
                <Skeleton isLoaded={isLoaded}>
                  <div className='flex items-center justify-center gap-2'>
                    <CarIcon size={24} />
                    <span>{transmission.name}</span>
                  </div>
                </Skeleton>
                <Skeleton isLoaded={isLoaded}>
                  <div className='flex items-center justify-center gap-2'>
                    <GasPump size={24} />
                    <span>{fuel.name}</span>
                  </div>
                </Skeleton>
              </div>
              <Skeleton isLoaded={isLoaded}>
                <div className='flex items-center justify-left '>
                  <CurrencyDollar size={32} />
                  <span className='text-3xl text-neutral-100'>
                    {fixedDayPrice}
                    <span className='text-2xl opacity-75'>/{t('car.day')}</span>
                  </span>
                </div>
              </Skeleton>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default Car;
