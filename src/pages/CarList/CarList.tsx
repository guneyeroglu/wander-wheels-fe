import { ChangeEvent, FC, useState } from 'react';
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

import {
  ICar,
  FuelType,
  TransmissionType,
  IColor,
  IType,
  ICarFilter,
} from '../../global/interfaces';
import Car from '../../components/Car/Car';

interface IBrand {
  name: string;
  model: string[];
}

const defaultPriceRange: number[] = [0, 2500];
const defaultYearRange: number[] = [2014, 2024];
const getLocalStorageCarFilter: ICarFilter = JSON.parse(localStorage.getItem('carFilter') ?? '{}');
const defaultCarFilter: ICarFilter = {
  brands: null,
  models: null,
  transmissionTypes: null,
  fuelTypes: null,
  minPrice: defaultPriceRange[0],
  maxPrice: defaultPriceRange[1],
  minYear: defaultYearRange[0],
  maxYear: defaultYearRange[1],
  seat: null,
  colors: null,
};
const startingCarFilter: ICarFilter = getLocalStorageCarFilter;

const CarList: FC = () => {
  const loaderData = useLoaderData({ strict: false }) as ICar[];
  const { t } = useTranslation();
  const [carFilter, setCarFilter] = useState<ICarFilter>(startingCarFilter);

  const filteredMockData: ICar[] = loaderData?.filter((car: ICar) => car);
  const brands: IBrand[] = [
    { name: 'BMW', model: ['i5'] },
    { name: 'Audi', model: ['A3'] },
    { name: 'Ferrari', model: ['Spider'] },
  ];
  const models: string[] | undefined = brands.find(
    (brand: IBrand) => brand.name === carFilter.brands,
  )?.model;
  const transmissions: IType<TransmissionType>[] = [
    { id: 1, type: 'Manual' },
    { id: 2, type: 'Automatic' },
    { id: 3, type: 'Hybrid' },
  ];
  const fuels: IType<FuelType>[] = [
    { id: 1, type: 'Electric' },
    { id: 2, type: 'Petrol' },
  ];
  const seats: number[] = [2, 3, 4];
  const colors: IColor[] = [
    { text: 'Black', code: '#262626' },
    { text: 'White', code: '#e5e5e5' },
    { text: 'Grey', code: '#404040' },
  ];

  const handleResetAllFilter = (): void => {
    setCarFilter(defaultCarFilter);
  };

  const handleSearch = (): void => {
    console.log('searching...', carFilter);
    localStorage.setItem('carFilter', JSON.stringify(carFilter));
  };

  const handleBrandValue = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCarFilter((prevFilter: ICarFilter) => ({
      ...prevFilter,
      brands: e.target.value,
      models: null,
    }));
  };

  const handleModelValue = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCarFilter((prevFilter: ICarFilter) => ({ ...prevFilter, models: e.target.value }));
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

  const handleTransmissionTypeValue = (e: Nullable<IType<TransmissionType>>): void => {
    setCarFilter((prevFilter: ICarFilter) => ({
      ...prevFilter,
      transmissionTypes: e?.type ?? null,
    }));
  };

  const handleFuelTypeValue = (e: Nullable<IType<FuelType>>): void => {
    setCarFilter((prevFilter: ICarFilter) => ({
      ...prevFilter,
      fuelTypes: e?.type ?? null,
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
      const colorValues: string[] = e.target.value.split(',');
      const colorValue: IColor[] = colorValues.map(
        (splitColor: string) => colors.find((color: IColor) => color.text === splitColor)!,
      );

      setCarFilter((prevFilter: ICarFilter) => ({
        ...prevFilter,
        colors: colorValue.map((color: IColor) => color.text),
      }));
    } else {
      setCarFilter((prevFilter: ICarFilter) => ({
        ...prevFilter,
        colors: null,
      }));
    }
  };

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
            selectedKeys={carFilter.brands ? [carFilter.brands] : []}
            onChange={handleBrandValue}
          >
            {brands.map((brand: IBrand) => (
              <SelectItem key={brand.name} value={brand.name}>
                {brand.name}
              </SelectItem>
            ))}
          </Select>
          {carFilter.brands && !!models?.length && (
            <Select
              key={carFilter.brands}
              label={t('car.model')}
              size='sm'
              selectedKeys={carFilter.models ? [carFilter.models] : []}
              onChange={handleModelValue}
            >
              {models?.map((model: string) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
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
                color={carFilter.transmissionTypes ? 'default' : 'secondary'}
                onClick={() => handleTransmissionTypeValue(null)}
              >
                {t('common.any')}
              </Chip>
              {transmissions.map((transmission: IType<TransmissionType>) => (
                <Chip
                  key={transmission.id}
                  className='cursor-pointer'
                  color={
                    carFilter.transmissionTypes === transmission.type ? 'secondary' : 'default'
                  }
                  onClick={() => handleTransmissionTypeValue(transmission)}
                >
                  {transmission.type}
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
                color={carFilter.fuelTypes ? 'default' : 'secondary'}
                onClick={() => handleFuelTypeValue(null)}
              >
                {t('common.any')}
              </Chip>
              {fuels.map((fuel: IType<FuelType>) => (
                <Chip
                  key={fuel.id}
                  className='cursor-pointer'
                  color={carFilter.fuelTypes === fuel.type ? 'secondary' : 'default'}
                  onClick={() => handleFuelTypeValue(fuel)}
                >
                  {fuel.type}
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
            selectedKeys={carFilter.colors ?? []}
            onChange={handleColorValue}
          >
            {colors.map((color: IColor) => (
              <SelectItem
                key={color.text}
                value={color.text}
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
                {color.text}
              </SelectItem>
            ))}
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
          <span className='font-semibold text-xl'>{`(${filteredMockData.length})`}</span>
        </div>
        <div className='flex flex-wrap items-stretch justify-start'>
          {filteredMockData.map((car: ICar) => (
            <Car key={car.id} {...car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarList;
