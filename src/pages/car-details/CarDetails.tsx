import { FC, useState } from 'react';
import { useLoaderData } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { CaretLeft, Circle, CurrencyDollar } from '@phosphor-icons/react';
import moment from 'moment';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Image,
  Input,
  Link,
} from '@nextui-org/react';

import { ICar } from '../../global/interfaces';
import CustomFavoriteButton from '../../components/CustomFavoriteButton/CustomFavoriteButton';

const CarDetails: FC = () => {
  const { id, brand, model, year, dayPrice, color, images, transmission, fuel, seat, createdDate } =
    useLoaderData({ strict: false }) as ICar;
  const { t } = useTranslation();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const isNew: boolean = moment().diff(createdDate, 'day') <= 5;
  const allImages: string[] = [images.featured, ...images.others];
  const fixedDayPrice: string = dayPrice.toFixed(2);
  const day: number = 3;
  const totalDayPrice: number = dayPrice * day;
  const fixedTotalDayPrice: string = totalDayPrice.toFixed(2);
  const taxes: number = totalDayPrice * 0.18;
  const fixedTaxes: string = taxes.toFixed(2);
  const insurance: number = totalDayPrice * 0.12;
  const fixedInsurance: string = insurance.toFixed(2);
  const totalPrice: number = totalDayPrice + taxes + insurance;
  const fixedTotalPrice: string = totalPrice.toFixed(2);

  const handleFavoriteStatus = (): void => setIsFavorite((preValue: boolean) => !preValue);
  const handleImageIndexValue = (index: number) => setImageIndex(index);

  return (
    <div key={id} className='w-full h-full'>
      <div className='flex items-center justify-start mb-4'>
        <Link className='self-start gap-2' href='/car-list'>
          <CaretLeft size={32} />
          <span className='text-2xl'>{t('common.back')}</span>
        </Link>
      </div>
      <div className='w-full h-full flex items-start justify-start gap-4'>
        <div className='w-1/2'>
          <Card className='w-full h-full relative overflow-hidden'>
            <CardHeader>
              <div className='w-full flex items-center justify-between'>
                <div className='flex items-center justify-start gap-2 min-h-7'>
                  {isNew && <Chip color='warning'>{t('car.new')}</Chip>}
                </div>
                <div className='flex items-center justify-left '>
                  <CurrencyDollar size={32} />
                  <span className='text-3xl text-neutral-100'>
                    {fixedDayPrice}
                    <span className='text-2xl opacity-75'>/{t('car.day')}</span>
                  </span>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className='w-full h-full'>
              <div className='w-full h-full relative'>
                <Image
                  isBlurred
                  width={'100%'}
                  height={'100%'}
                  src={allImages[imageIndex]}
                  alt={`${brand}-${model}`}
                  className='hover:scale-105 h-[500px] object-cover object-center'
                  classNames={{
                    wrapper: 'overflow-hidden w-full h-full rounded-large',
                  }}
                />
                <CustomFavoriteButton
                  onClick={handleFavoriteStatus}
                  filled={isFavorite}
                  className='absolute top-3 right-3 z-10'
                />
              </div>
              <div className='overflow-scroll w-full h-20 flex items-center justify-start mt-4 gap-0'>
                {allImages.map((image: string, index: number) => (
                  <Button
                    key={image}
                    className={`h-full border-1.5 border-solid mr-4 last:mr-0 ${imageIndex === index ? 'border-neutral-200' : 'border-transparent'}`.trim()}
                    style={{
                      width: '25%',
                      minWidth: '25%',
                    }}
                    isIconOnly
                    disableRipple
                    onClick={() => handleImageIndexValue(index)}
                  >
                    <Image
                      isBlurred
                      width={'100%'}
                      height={'100%'}
                      src={image}
                      alt={`${brand}-${model}`}
                      className='w-full h-full object-cover object-center'
                      classNames={{
                        wrapper: 'overflow-hidden w-full h-full rounded-large',
                      }}
                    />
                  </Button>
                ))}
              </div>
            </CardBody>
            <CardFooter className='flex flex-col items-start justify-center'>
              <h3 className='text-3xl font-bold text-neutral-200 mb-4'>{`${brand} ${model}`}</h3>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-2xl font-medium'>{t('car.year')}</span>
                  <span className='text-2xl font-medium'>{year}</span>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-2xl font-medium'>{t('car.transmissionType')}</span>
                  <span className='text-2xl font-medium'>{transmission.type}</span>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-2xl font-medium'>{t('car.fuelType')}</span>
                  <span className='text-2xl font-medium'>{fuel.type}</span>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-2xl font-medium'>{t('car.seat')}</span>
                  <span className='text-2xl font-medium'>{seat}</span>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-2xl font-medium'>{t('car.color')}</span>
                  <div className='flex items-center justify-center gap-2'>
                    <Circle
                      size={20}
                      weight='fill'
                      fill={color.code}
                      className='border-1.5 border-solid border-neutral-200 rounded-full'
                      style={{ backgroundColor: color.code }}
                    />
                    <span className='text-2xl font-medium'>{color.text}</span>
                  </div>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className='w-1/2'>
          <Card>
            <CardHeader className='gap-2'>
              <Input
                name='location'
                label={t('form.location')}
                labelPlacement='outside'
                value={'aynen'}
                size='lg'
                radius='sm'
                variant='bordered'
                color={'default'}
                readOnly
              />
              <Input
                name='username'
                label={t('form.start')}
                labelPlacement='outside'
                value={'aynen'}
                size='lg'
                radius='sm'
                variant='bordered'
                color={'default'}
                readOnly
              />
              <Input
                name='username'
                label={t('form.end')}
                labelPlacement='outside'
                value={'aynen'}
                size='lg'
                radius='sm'
                variant='bordered'
                color={'default'}
                readOnly
              />
            </CardHeader>
            <CardBody>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-xl font-medium'>{`${t('car.day').substring(0, 1).toUpperCase()}${t('car.day').slice(1)}`}</span>
                  <span className='text-xl font-medium'>{day}</span>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-xl font-medium'>{t('car.price')}</span>
                  <div className='flex items-center justify-start'>
                    <CurrencyDollar size={24} />
                    <span className='text-xl font-medium'>{fixedTotalDayPrice}</span>
                  </div>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-xl font-medium'>{t('car.taxes')}</span>
                  <div className='flex items-center justify-start'>
                    <CurrencyDollar size={24} />
                    <span className='text-xl font-medium'>{fixedTaxes}</span>
                  </div>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-xl font-medium'>{t('car.insurance')}</span>
                  <div className='flex items-center justify-start'>
                    <CurrencyDollar size={24} />
                    <span className='text-xl font-medium'>{fixedInsurance}</span>
                  </div>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
            </CardBody>
            <CardFooter className='flex-col mt-4'>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-xl font-medium'>{t('car.totalPrice')}</span>
                  <div className='flex items-center justify-start gap-2'>
                    <CurrencyDollar size={24} />
                    <span className='text-xl font-medium'>{fixedTotalPrice}</span>
                  </div>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full flex items-center justify-end'>
                <Button size='lg' color='primary'>
                  {t('car.rent')}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
