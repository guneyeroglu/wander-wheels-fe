import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Car as CarIcon, GasPump, Circle, UsersThree } from '@phosphor-icons/react';
import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image } from '@nextui-org/react';

import { ICar } from '../../global/interfaces/services/cars';
import { utils } from '../../global/functions';
import clsx from 'clsx';

interface IProps {
  id: string;
  car: ICar;
}

const Car: FC<IProps> = ({ id, car }) => {
  const {
    id: carId,
    color,
    dailyPrice,
    discountStatus,
    discountedDailyPrice,
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
  const fixedDiscountedDayPrice: string = (discountedDailyPrice ?? 0).toFixed(2);

  return (
    <div key={`${id}-${carId}`} className='p-2 w-1/2 h-full relative max-sm:w-full'>
      <Link className='w-full h-full cursor-pointer hover:opacity-100' to={`/car-details/${id}`}>
        <Card
          isHoverable
          shadow='sm'
          className='w-full border-t-1.5 border-b-1.5 border-neutral-600 border-solid dark:data-[hover=true]:shadow-large dark:data-[hover=true]:border-neutral-200'
        >
          <CardHeader className='flex flex-col items-start justify-center'>
            <div className='w-full flex items-center justify-between my-2 gap-2'>
              <h3 className='text-3xl font-medium text-neutral-200'>{`${model.brand.name} ${model.name}`}</h3>
              {isNew && <Chip color='warning'>{t('car.new')}</Chip>}
            </div>
            <span className='text-xl font-normal text-neutral-200 opacity-75'>{year}</span>
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
            />
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
          </CardBody>
          <Divider className='h-[1.5px] bg-neutral-600' />
          <CardFooter className='flex flex-col items-start justify-start h-full min-h-40'>
            <div className='flex flex-col items-start flex-1 w-full h-full'>
              <span className='block w-full text-left mb-2 opacity-75'>{t('common.features')}</span>
              <div className='flex flex-wrap items-center justify-start gap-4 overflow-visible mb-2'>
                <div className='flex items-center justify-center gap-2'>
                  <UsersThree size={24} />
                  <span>{seat}</span>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  <CarIcon size={24} />
                  <span>{transmission.name}</span>
                </div>
                <div className='flex items-center justify-center gap-2'>
                  <GasPump size={24} />
                  <span>{fuel.name}</span>
                </div>
              </div>
              <div
                className={clsx({
                  'flex items-end justify-start flex-1': !discountStatus,
                  'flex flex-col items-start justify-center': discountStatus,
                })}
              >
                <span
                  className={clsx({
                    'text-3xl text-neutral-100': !discountStatus,
                    'text-2xl text-neutral-100/50 line-through': discountStatus,
                  })}
                >
                  &#36; {fixedDayPrice}
                </span>
                <div className='flex items-center justify-left'>
                  {discountStatus && (
                    <span className='text-3xl text-neutral-100'>
                      &#36; {fixedDiscountedDayPrice}
                    </span>
                  )}
                  <span className='text-2xl opacity-75 no-underline'>/{t('car.day')}</span>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default Car;
