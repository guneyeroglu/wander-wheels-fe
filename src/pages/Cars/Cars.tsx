import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Select,
  SelectItem,
  Slider,
  SliderValue,
} from '@nextui-org/react';
import { ArrowsCounterClockwise, Circle, X } from '@phosphor-icons/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import Car from '../../components/Car/Car';
import NoData from '../../components/NoData/NoData';
import SkeletonCars from '../../components/SkeletonCars/SkeletonCars';
import { ICarFilter } from '../../global/interfaces';
import { GetAllBrands } from '../../global/services/brands';
import { IBrand } from '../../global/interfaces/services/brands';
import { GetAllModels } from '../../global/services/models';
import { IModel } from '../../global/interfaces/services/models';
import { ITransmission } from '../../global/interfaces/services/transmissions';
import { GetAllTransmissions } from '../../global/services/transmissions';
import { GetAllFuels } from '../../global/services/fuels';
import { IFuel } from '../../global/interfaces/services/fuels';
import { GetAllColors } from '../../global/services/colors';
import { IColor } from '../../global/interfaces/services/colors';
import { GetAllCars, GetPriceRange, GetYearRange } from '../../global/services/cars';
import { ICarAndId } from '../../global/interfaces/services/cars';
import { GetSeats } from '../../global/services/cars/getSeats';

const Cars: FC = () => {
  const { t, i18n } = useTranslation();
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const getLocalStorageCarFilter: Nullable<ICarFilter> = JSON.parse(
    localStorage.getItem('carFilter') ?? 'null',
  );
  const cityId: number = getLocalStorageCarFilter?.cityId ?? 0;
  const startDate: string = getLocalStorageCarFilter?.startDate ?? '';
  const endDate: string = getLocalStorageCarFilter?.endDate ?? '';

  useEffect(() => {
    if (cityId === 0 || startDate === '' || endDate === '') {
      navigate('/');
    }
  }, [cityId, startDate, endDate, navigate]);

  const { data: pricesData } = GetPriceRange();
  const defaultPriceRange: number[] = [
    pricesData?.data.minPrice ?? 0,
    pricesData?.data.maxPrice ?? 0,
  ];
  const { data: yearsData } = GetYearRange();
  const defaultYearRange: number[] = [yearsData?.data.minYear ?? 0, yearsData?.data.maxYear ?? 0];
  const { data: seatsData } = GetSeats();
  const seats: number[] | undefined = seatsData?.data.seats;
  const defaultCarFilter: ICarFilter = {
    brandId: null,
    modelId: null,
    transmissionId: null,
    fuelId: null,
    minPrice: defaultPriceRange[0],
    maxPrice: defaultPriceRange[1],
    minYear: defaultYearRange[0],
    maxYear: defaultYearRange[1],
    seat: null,
    colorIds: null,
    cityId,
    startDate,
    endDate,
  };
  const [carFilter, setCarFilter] = useState<ICarFilter>({
    ...(getLocalStorageCarFilter ?? defaultCarFilter),
    cityId,
    startDate,
    endDate,
  });

  const {
    data: carsData,
    isFetching: isFetchingForCars,
    isRefetching: isRefetchingForCars,
    refetch: refetchForCars,
  } = GetAllCars({
    ...carFilter,
    cityId,
    startDate,
    endDate,
    options: {
      enabled: false,
    },
  });
  const cars: Nullable<Undefinedable<ICarAndId[]>> = carsData?.data;
  const isLoadingForCars: boolean = isFetchingForCars || isRefetchingForCars;
  const {
    data: brandsData,
    isFetching: isFetchingForBrands,
    isRefetching: isRefetchingForBrands,
    isError: isErrorForBrands,
    refetch: refetchForBrands,
  } = GetAllBrands();
  const brands: Undefinedable<IBrand[]> = brandsData?.data;
  const isLoadingForBrands: boolean = isFetchingForBrands || isRefetchingForBrands;
  const {
    data: modelsData,
    isFetching: isFetchingForModels,
    isRefetching: isRefetchingForModels,
    isError: isErrorForModels,
    refetch: refetchForModels,
  } = GetAllModels({
    options: {
      enabled: false,
    },
  });
  const models: Undefinedable<IModel[]> = modelsData?.data.filter(
    (model: Undefinedable<IModel>) => model?.brand.id === carFilter.brandId,
  );
  const isLoadingForModels: boolean = isFetchingForModels || isRefetchingForModels;
  const { data: transmissionsData, refetch: refetchForTransmissions } = GetAllTransmissions({
    options: {
      enabled: false,
    },
  });
  const transmissions: Undefinedable<ITransmission[]> = transmissionsData?.data;
  const { data: fuelsData, refetch: refetchForFuels } = GetAllFuels({
    options: {
      enabled: false,
    },
  });
  const fuels: Undefinedable<IFuel[]> = fuelsData?.data;
  const {
    data: colorsData,
    isFetching: isFetchingForColors,
    isRefetching: isRefetchingForColors,
    isError: isErrorForColors,
    refetch: refetchForColors,
  } = GetAllColors();
  const colors: Undefinedable<IColor[]> = colorsData?.data;
  const isLoadingForColors: boolean = isFetchingForColors || isRefetchingForColors;

  const handleResetAllFilter = (): void => {
    setCarFilter(defaultCarFilter);
  };

  const handleSearch = (): void => {
    localStorage.setItem('carFilter', JSON.stringify(carFilter));
    handleFilterClose();
    refetchForCars();
  };

  const handleBrandValue = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCarFilter((prevFilter: ICarFilter) => ({
      ...prevFilter,
      brandId: Number(e.target.value),
      modelId: null,
    }));
  };

  const handleModelValue = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCarFilter((prevFilter: ICarFilter) => ({ ...prevFilter, modelId: Number(e.target.value) }));
  };

  const handlePriceRangeValue = (e: number | number[]): void => {
    if (Array.isArray(e)) {
      setCarFilter((prevFilter: ICarFilter) => ({
        ...prevFilter,
        minPrice: e[0],
        maxPrice: e[1],
      }));
    }
  };

  const handleYearRangeValue = (e: number | number[]): void => {
    if (Array.isArray(e)) {
      setCarFilter((prevFilter: ICarFilter) => ({
        ...prevFilter,
        minYear: e[0],
        maxYear: e[1],
      }));
    }
  };

  const handleTransmissionValue = (e: Nullable<number>): void => {
    setCarFilter((prevFilter: ICarFilter) => ({
      ...prevFilter,
      transmissionId: e ?? null,
    }));
  };

  const handleFuelValue = (e: Nullable<number>): void => {
    setCarFilter((prevFilter: ICarFilter) => ({
      ...prevFilter,
      fuelId: e ?? null,
    }));
  };

  const handleSeatValue = (e: Nullable<number>): void => {
    setCarFilter((prevFilter: ICarFilter) => ({
      ...prevFilter,
      seat: e,
    }));
  };

  const handleColorValue = (e: ChangeEvent<HTMLSelectElement>): void => {
    if (e.target.value) {
      const colorIdValues: number[] = e.target.value
        .split(',')
        .map((colorId: string) => Number(colorId));

      setCarFilter((prevFilter: ICarFilter) => ({
        ...prevFilter,
        colorIds: colorIdValues,
      }));
    } else {
      setCarFilter((prevFilter: ICarFilter) => ({
        ...prevFilter,
        colorIds: null,
      }));
    }
  };

  const handleFilterOpen = (): void => setFilterOpen(true);
  const handleFilterClose = (): void => setFilterOpen(false);

  useEffect(() => {
    refetchForBrands();
    refetchForModels();
    refetchForColors();
    refetchForFuels();
    refetchForTransmissions();
  }, [
    refetchForBrands,
    refetchForModels,
    refetchForColors,
    refetchForFuels,
    refetchForTransmissions,
    i18n.language,
  ]);

  useEffect(() => {
    refetchForCars();
  }, [cityId, startDate, endDate, refetchForCars]);

  return (
    <div
      className={clsx('w-full h-full flex justify-start gap-4', {
        'items-start': cars && cars?.length > 0,
        'items-stretch': (cars && cars?.length === 0) || !cars,
      })}
    >
      <Card
        className={clsx(
          'w-1/3 sticky top-[80px] max-lg:fixed max-lg:inset-0 max-lg:z-[60] max-lg:rounded-tl-none max-lg:rounded-bl-none max-lg:w-1/2 max-md:w-full max-md:rounded-none',
          {
            'max-lg:translate-x-[-100%]': !filterOpen,
            'max-lg:translate-x-0': filterOpen,
          },
        )}
        shadow='sm'
      >
        <CardHeader>
          <div className='w-full flex flex-col'>
            <Button
              className='hidden self-end mb-2 max-lg:inline-flex'
              isIconOnly
              variant='solid'
              color={'danger'}
              onClick={handleFilterClose}
            >
              <X color={'#e5e5e5'} size={16} />
            </Button>
            <div className='w-full flex items-center justify-between'>
              <span className='text-xl'>{t('common.filters')}</span>
              <Button variant='light' onClick={handleResetAllFilter}>
                <ArrowsCounterClockwise />
                <span>{t('common.resetAll')}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className='gap-4 grow-0'>
          <Select
            label={t('car.brand')}
            size='sm'
            selectedKeys={
              isLoadingForBrands || isErrorForBrands
                ? [t('common.noData')]
                : carFilter.brandId
                  ? [String(carFilter.brandId)]
                  : []
            }
            onChange={handleBrandValue}
            isLoading={isLoadingForBrands}
            isDisabled={isLoadingForBrands || isErrorForBrands}
          >
            {brands && !!brands.length && !isLoadingForBrands ? (
              brands.map((brand: IBrand) => (
                <SelectItem key={String(brand.id)} value={String(brand.id)}>
                  {brand.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem key={t('common.noData')} value={t('common.noData')}>
                {t('common.noData')}
              </SelectItem>
            )}
          </Select>
          {carFilter.brandId && !!models?.length && (
            <Select
              key={String(carFilter.brandId)}
              label={t('car.model')}
              size='sm'
              selectedKeys={
                isLoadingForModels || isErrorForModels
                  ? [t('common.noData')]
                  : carFilter.modelId
                    ? [String(carFilter.modelId)]
                    : []
              }
              onChange={handleModelValue}
              isLoading={isLoadingForModels}
              isDisabled={isLoadingForModels || isErrorForModels}
            >
              {models && !isLoadingForModels ? (
                models.map((model: IModel) => (
                  <SelectItem key={String(model.id)} value={String(model.id)}>
                    {model.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem key={t('common.noData')} value={t('common.noData')}>
                  {t('common.noData')}
                </SelectItem>
              )}
            </Select>
          )}
          <Divider />
          <Slider
            classNames={{
              label: 'text-md font-normal text-neutral-200',
              base: 'gap-2',
            }}
            label={t('car.priceRange')}
            step={10}
            minValue={defaultPriceRange[0]}
            maxValue={defaultPriceRange[1]}
            value={
              carFilter.minPrice && carFilter.maxPrice
                ? [carFilter.minPrice, carFilter.maxPrice]
                : defaultPriceRange
            }
            defaultValue={defaultPriceRange}
            formatOptions={{ style: 'currency', currency: 'USD' }}
            onChange={handlePriceRangeValue}
          />
          <Divider />
          <Slider
            classNames={{
              label: 'text-md font-normal text-neutral-200',
              base: 'gap-2',
            }}
            label={t('car.yearRange')}
            step={1}
            minValue={defaultYearRange[0]}
            maxValue={defaultYearRange[1]}
            value={
              carFilter.minYear && carFilter.maxYear
                ? [carFilter.minYear, carFilter.maxYear]
                : defaultYearRange
            }
            defaultValue={defaultYearRange}
            getValue={(e: SliderValue) => {
              let value: string = '';
              if (Array.isArray(e)) {
                const firstValue: number = e[0];
                const secondValue: number = e[1];

                if (firstValue === secondValue) {
                  value = `~${secondValue}`;
                } else {
                  value = `${firstValue} - ${secondValue}`;
                }
              } else {
                value = `${e}`;
              }

              return value;
            }}
            onChange={handleYearRangeValue}
          />
          <Divider />
          <div className='w-full flex flex-col gap-2'>
            <span className='text-md font-normal text-neutral-200'>
              {t('car.transmissionType')}
            </span>
            <div className='w-full flex flex-wrap items-center justify-start gap-2'>
              <Chip
                className='cursor-pointer'
                color={carFilter.transmissionId ? 'default' : 'secondary'}
                onClick={() => handleTransmissionValue(null)}
              >
                {t('common.any')}
              </Chip>
              {transmissions &&
                transmissions.map((transmission: ITransmission) => (
                  <Chip
                    key={String(transmission.id)}
                    className='cursor-pointer'
                    color={carFilter.transmissionId === transmission?.id ? 'secondary' : 'default'}
                    onClick={() => handleTransmissionValue(transmission.id)}
                  >
                    {transmission.name}
                  </Chip>
                ))}
            </div>
          </div>
          <Divider />
          <div className='w-full flex flex-col gap-2'>
            <span className='text-md font-normal text-neutral-200'>{t('car.fuelType')}</span>
            <div className='w-full flex flex-wrap items-center justify-start gap-2'>
              <Chip
                className='cursor-pointer'
                color={carFilter.fuelId ? 'default' : 'secondary'}
                onClick={() => handleFuelValue(null)}
              >
                {t('common.any')}
              </Chip>
              {fuels &&
                fuels.map((fuel: IFuel) => (
                  <Chip
                    key={fuel.id}
                    className='cursor-pointer'
                    color={carFilter.fuelId === fuel.id ? 'secondary' : 'default'}
                    onClick={() => handleFuelValue(fuel.id)}
                  >
                    {fuel.name}
                  </Chip>
                ))}
            </div>
          </div>
          <Divider />
          <div className='w-full flex flex-col gap-2'>
            <span className='text-md font-normal text-neutral-200'>{t('car.seat')}</span>
            <div className='w-full flex flex-wrap items-center justify-start gap-2'>
              <Chip
                className='cursor-pointer'
                color={carFilter.seat ? 'default' : 'secondary'}
                onClick={() => handleSeatValue(null)}
              >
                {t('common.any')}
              </Chip>
              {seats &&
                seats.map((seat: number) => (
                  <Chip
                    key={seat}
                    className='cursor-pointer'
                    color={carFilter.seat === seat ? 'secondary' : 'default'}
                    onClick={() => handleSeatValue(seat)}
                  >
                    {seat}
                  </Chip>
                ))}
            </div>
          </div>
          <Divider />
          <Select
            label={t('car.color')}
            size='sm'
            selectionMode='multiple'
            selectedKeys={
              isLoadingForColors || isErrorForColors
                ? [t('common.noData')]
                : carFilter.colorIds
                  ? carFilter.colorIds.map(colorId => String(colorId))
                  : []
            }
            onChange={handleColorValue}
            isLoading={isLoadingForColors}
            isDisabled={isLoadingForColors || isErrorForColors}
          >
            {colors && !isLoadingForColors ? (
              colors.map((color: IColor) => (
                <SelectItem
                  key={String(color.id)}
                  value={String(color.id)}
                  startContent={
                    <Circle
                      size={20}
                      weight='fill'
                      fill={color.code}
                      className='border-1.5 border-solid border-neutral-200 rounded-full'
                      style={{ backgroundColor: color.code }}
                    />
                  }
                >
                  {color.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem key={t('common.noData')} value={t('common.noData')}>
                {t('common.noData')}
              </SelectItem>
            )}
          </Select>
        </CardBody>
        <CardFooter>
          <Button fullWidth color='primary' onClick={handleSearch}>
            {t('common.search')}
          </Button>
        </CardFooter>
      </Card>
      <motion.div
        className={clsx('bg-neutral-950/hover fixed inset-0 z-[59] lg:hidden', {
          'pointer-events-none': !filterOpen,
          'pointer-events-auto': filterOpen,
        })}
        onClick={handleFilterClose}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: filterOpen ? 1 : 0,
        }}
        transition={{
          bounce: false,
          duration: 0.35,
          ease: 'easeInOut',
        }}
      />
      <div className='w-2/3 flex flex-col max-lg:w-full'>
        <div className='w-full flex justify-between mb-4 px-2'>
          <Button className='hidden max-lg:inline-flex' onClick={handleFilterOpen}>
            {t('common.filters')}
          </Button>
          <div className='text-left self-center'>
            <span className='font-normal text-xl'>{`${t('car.searchResults')} `}</span>
            <span className='font-semibold text-xl'>{`(${cars?.length ?? 0})`}</span>
          </div>
        </div>
        {isLoadingForCars ? (
          <SkeletonCars />
        ) : cars && cars.length > 0 ? (
          <div className='flex flex-wrap items-stretch justify-start'>
            {cars?.map((car: ICarAndId) => <Car key={car.id} id={car.id} car={car.car} />)}
          </div>
        ) : (
          <NoData text={t('common.noData')} />
        )}
      </div>
    </div>
  );
};

export default Cars;
