import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { CaretLeft, Circle, CurrencyDollar } from '@phosphor-icons/react';
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
  Skeleton,
} from '@nextui-org/react';
import moment from 'moment';

import { CreateRental, GetCarById } from '../../global/services/cars';
import { ICar } from '../../global/interfaces/services/cars';
import { utils } from '../../global/functions';
import { ICarFilter } from '../../global/interfaces';
import { GetCityById } from '../../global/services/cities';
import { ICity } from '../../global/interfaces/services/cities';
import { useSnackbarInfo, useUserInfo } from '../../store';

const CarDetails: FC = () => {
  const { carAndCityId } = useParams();
  const { setSnackbar } = useSnackbarInfo();
  const { id } = useUserInfo();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const carFilter: Nullable<ICarFilter> = JSON.parse(localStorage.getItem('carFilter') ?? 'null');
  const {
    data: carData,
    isFetching,
    isRefetching,
    refetch,
    isError: isErrorForCarById,
  } = GetCarById({
    carAndCityId: carAndCityId ?? '',
  });
  const car: Undefinedable<ICar> = carData?.data.car;
  const { data: cityData, isError: isErrorForCityById } = GetCityById({
    cityId: carFilter?.cityId ? carFilter.cityId.toString() : '',
    options: {
      enabled: !!carFilter?.cityId,
    },
  });
  const city: Undefinedable<ICity> = cityData?.data;
  const _cityName: string = city?.name ?? '';
  const _startDate: string = moment(carFilter?.startDate).format('DD.MM.YYYY');
  const _endDate: string = moment(carFilter?.endDate).format('DD.MM.YYYY');
  const isLoading: boolean = isFetching || isRefetching;
  const [imageIndex, setImageIndex] = useState<number>(0);
  const { mutate: mutateForRental } = CreateRental();

  const goBack = (): void => navigate('/cars');

  useEffect(() => {
    refetch();
  }, [i18n.language, refetch]);

  useEffect(() => {
    if (isErrorForCarById || !carFilter?.cityId || !carFilter?.startDate || !carFilter?.endDate) {
      navigate('/cars', { replace: true });
    }
  }, [
    _cityName,
    carFilter?.cityId,
    carFilter?.endDate,
    carFilter?.startDate,
    isErrorForCarById,
    isErrorForCityById,
    navigate,
  ]);

  if (!isLoading) {
    if (!car) {
      goBack();
      return;
    }
  }

  const isNew: boolean = utils.isNew(car?.createdDate);
  const allImages: string[] = [
    car?.images.featuredImage ?? '',
    ...(car?.images.otherImages ?? ['']),
  ];

  const dailyPrice: number = car?.dailyPrice ?? 0;
  const fixedDayPrice: string = dailyPrice.toFixed(2);
  const day: number = utils.dayCount(
    moment(carFilter?.endDate).toDate(),
    moment(carFilter?.startDate).toDate(),
  );
  const totalDayPrice: number = dailyPrice * day;
  const fixedTotalDayPrice: string = totalDayPrice.toFixed(2);
  const taxes: number = totalDayPrice * 0.18; // 18% tax
  const fixedTaxes: string = taxes.toFixed(2);
  const insurance: number = totalDayPrice * 0.12; // 12% insurance
  const fixedInsurance: string = insurance.toFixed(2);
  const totalPrice: number = totalDayPrice + taxes + insurance;
  const fixedTotalPrice: string = totalPrice.toFixed(2);

  const handleImageIndexValue = (index: number) => setImageIndex(index);

  const handleSubmitForRent = (): void => {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
      return setSnackbar({
        open: true,
        title: t('common.noAccountNoRental'),
        state: 'warning',
      });
    }

    mutateForRental(
      {
        userId: id,
        carAndCityId: carAndCityId ?? '',
        startDate: moment(carFilter?.startDate).add(1, 'day').toDate(),
        endDate: moment(carFilter?.endDate).add(1, 'day').toDate(),
      },
      {
        onSuccess: (): void => {
          navigate('/');
        },
      },
    );
  };

  return (
    <div key={car?.id} className='w-full h-full'>
      <div className='flex items-center justify-start mb-4'>
        <Button variant='light' className='self-start gap-2' onClick={goBack}>
          <CaretLeft size={32} />
          <span className='text-2xl'>{t('common.back')}</span>
        </Button>
      </div>
      <div className='w-full h-full flex items-start justify-start gap-4 max-lg:flex-col max-lg:mb-12'>
        <div className='w-1/2 max-lg:w-full'>
          <Card className='w-full h-full relative overflow-hidden'>
            <CardHeader>
              <div className='w-full flex items-center justify-between'>
                <div className='flex items-center justify-start gap-2 min-h-7'>
                  {isNew && <Chip color='warning'>{t('car.new')}</Chip>}
                </div>
                <Skeleton isLoaded={!isLoading}>
                  <div className='flex items-center justify-left'>
                    <CurrencyDollar size={32} />
                    <span className='text-3xl text-neutral-100'>
                      {fixedDayPrice}
                      <span className='text-2xl opacity-75'>/{t('car.day')}</span>
                    </span>
                  </div>
                </Skeleton>
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
                  alt={`${car?.model.brand.name}-${car?.model.name}`}
                  className='hover:scale-105 h-[500px] object-cover object-center'
                  classNames={{
                    wrapper: 'overflow-hidden w-full h-full rounded-large',
                  }}
                  isLoading={isLoading}
                />
              </div>
              <div className='overflow-scroll w-full h-20 flex items-center justify-start mt-4 gap-0'>
                {allImages.map((image: string, index: number) => (
                  <Button
                    key={`${image}-${index}`}
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
                      alt={`${car?.model.brand.name}-${car?.model.name}`}
                      className='w-full h-full object-cover object-center'
                      classNames={{
                        wrapper: 'overflow-hidden w-full h-full rounded-large',
                      }}
                      isLoading={isLoading}
                    />
                  </Button>
                ))}
              </div>
            </CardBody>
            <CardFooter className='flex flex-col items-start justify-center'>
              <h3 className='text-3xl font-bold text-neutral-200 mb-4'>
                <Skeleton isLoaded={!isLoading}>
                  {`${car?.model.brand.name} ${car?.model.name}`}
                </Skeleton>
              </h3>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-2xl font-medium text-left'>{t('car.year')}</span>
                  <Skeleton isLoaded={!isLoading}>
                    <span className='text-2xl font-medium text-right'>{car?.year}</span>
                  </Skeleton>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-2xl font-medium text-left'>
                    {t('car.transmissionType')}
                  </span>
                  <Skeleton isLoaded={!isLoading}>
                    <span className='text-2xl font-medium text-right'>
                      {car?.transmission.name}
                    </span>
                  </Skeleton>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-2xl font-medium text-left'>{t('car.fuelType')}</span>
                  <Skeleton isLoaded={!isLoading}>
                    <span className='text-2xl font-medium text-right'>{car?.fuel.name}</span>
                  </Skeleton>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-2xl font-medium text-left'>{t('car.seat')}</span>
                  <Skeleton isLoaded={!isLoading}>
                    <span className='text-2xl font-medium text-right'>{car?.seat}</span>
                  </Skeleton>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-2xl font-medium text-left'>{t('car.color')}</span>
                  <Skeleton isLoaded={!isLoading}>
                    <div className='flex items-center justify-end gap-2'>
                      <Circle
                        size={20}
                        weight='fill'
                        fill={car?.color.code}
                        className='border-1.5 border-solid border-neutral-200 rounded-full'
                        style={{ backgroundColor: car?.color.code }}
                      />
                      <span className='text-2xl font-medium text-right'>{car?.color.name}</span>
                    </div>
                  </Skeleton>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className='w-1/2 max-lg:w-full'>
          <Card>
            <CardHeader className='gap-3 max-sm:flex-col'>
              <Input
                name='city'
                label={t('form.city')}
                labelPlacement='outside'
                value={_cityName}
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
                value={_startDate}
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
                value={_endDate}
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
                  <span className='text-xl font-medium text-left'>{`${t('car.day').substring(0, 1).toUpperCase()}${t('car.day').slice(1)}`}</span>
                  <Skeleton isLoaded={!isLoading}>
                    <span className='text-xl font-medium text-right'>{day}</span>
                  </Skeleton>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-xl font-medium text-left'>{t('car.price')}</span>
                  <Skeleton isLoaded={!isLoading}>
                    <div className='flex items-center justify-end'>
                      <CurrencyDollar size={24} />
                      <span className='text-xl font-medium text-right'>{fixedTotalDayPrice}</span>
                    </div>
                  </Skeleton>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-xl font-medium text-left'>{t('car.taxes')}</span>
                  <Skeleton isLoaded={!isLoading}>
                    <div className='flex items-center justify-end'>
                      <CurrencyDollar size={24} />
                      <span className='text-xl font-medium text-right'>{fixedTaxes}</span>
                    </div>
                  </Skeleton>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-xl font-medium text-left'>{t('car.insurance')}</span>
                  <Skeleton isLoaded={!isLoading}>
                    <div className='flex items-center justify-end'>
                      <CurrencyDollar size={24} />
                      <span className='text-xl font-medium text-right'>{fixedInsurance}</span>
                    </div>
                  </Skeleton>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
            </CardBody>
            <CardFooter className='flex-col'>
              <div className='w-full py-2 mb-2'>
                <div className='w-full flex items-center justify-between mb-2'>
                  <span className='text-xl font-medium text-left'>{t('car.totalPrice')}</span>
                  <Skeleton isLoaded={!isLoading}>
                    <div className='flex items-center justify-end gap-2'>
                      <CurrencyDollar size={24} />
                      <span className='text-xl font-medium text-right'>{fixedTotalPrice}</span>
                    </div>
                  </Skeleton>
                </div>
                <Divider className='h-[1.5px]' />
              </div>
              <div className='w-full flex items-center justify-end z-50 max-lg:fixed max-lg:inset-0 max-lg:top-auto'>
                <Button
                  size='lg'
                  color='primary'
                  onClick={handleSubmitForRent}
                  className='max-lg:w-full max-lg:rounded-none'
                  disabled={isLoading}
                >
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
