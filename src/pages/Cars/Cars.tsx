import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from '@tanstack/react-router';
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
import { ArrowsCounterClockwise, Circle } from '@phosphor-icons/react';

import Car from '../../components/Car/Car';
import { ICarFilter, IRentForm } from '../../global/interfaces';
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
import { GetAllCars } from '../../global/services/cars';
import { ICarAndId } from '../../global/interfaces/services/cars';

const defaultPriceRange: number[] = [0, 2500];
const defaultYearRange: number[] = [2014, 2024];
const getLocalStorageCarFilter: ICarFilter = JSON.parse(localStorage.getItem('carFilter') ?? '{}');
const startingCarFilter: ICarFilter = getLocalStorageCarFilter;

const Cars: FC = () => {
  const { t, i18n } = useTranslation();
  const { cityId, startDate, endDate } = useLoaderData({ strict: false }) as IRentForm;

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
    ...startingCarFilter,
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
  } = GetAllModels();
  const models: Undefinedable<IModel[]> = modelsData?.data.filter(
    (model: Undefinedable<IModel>) => model?.brand.id === carFilter.brandId,
  );
  const isLoadingForModels: boolean = isFetchingForModels || isRefetchingForModels;
  const { data: transmissionsData, refetch: refetchForTransmissions } = GetAllTransmissions();
  const transmissions: Undefinedable<ITransmission[]> = transmissionsData?.data;
  const { data: fuelsData, refetch: refetchForFuels } = GetAllFuels();
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
  const seats: number[] = [2, 3, 4];

  const handleResetAllFilter = (): void => {
    setCarFilter(defaultCarFilter);
  };

  const handleSearch = (): void => {
    localStorage.setItem('carFilter', JSON.stringify(carFilter));
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

  useEffect(() => {
    refetchForCars();
    refetchForBrands();
    refetchForModels();
    refetchForColors();
    refetchForFuels();
    refetchForTransmissions();
  }, [
    refetchForBrands,
    refetchForCars,
    refetchForColors,
    refetchForFuels,
    refetchForModels,
    refetchForTransmissions,
    i18n.language,
  ]);

  return (
    <div className='w-full h-full flex items-start justify-start gap-4'>
      <Card className='w-1/3 sticky top-[80px]' shadow='sm'>
        <CardHeader>
          <div className='w-full flex items-center justify-between'>
            <span className='text-xl'>{t('common.filters')}</span>
            <Button variant='light' onClick={handleResetAllFilter}>
              <ArrowsCounterClockwise />
              <span>{t('common.resetAll')}</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody className='gap-4'>
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
            {brands && !isLoadingForBrands ? (
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
            step={50}
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
              {seats.map((seat: number) => (
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
      <div className='w-2/3'>
        <div className='mb-4 text-left px-2'>
          <span className='font-normal text-xl'>{`${t('car.searchResults')} `}</span>
          <span className='font-semibold text-xl'>{`(${cars?.length ?? 0})`}</span>
        </div>
        <div className='flex flex-wrap items-stretch justify-start'>
          {cars &&
            cars?.map((car: ICarAndId) => (
              <Car key={car.id} id={car.id} car={car.car} isLoaded={!isLoadingForCars} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
