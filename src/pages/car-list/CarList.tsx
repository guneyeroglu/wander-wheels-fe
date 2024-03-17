import { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  Switch,
} from '@nextui-org/react';
import { ArrowsCounterClockwise } from '@phosphor-icons/react';

import { mockData } from '../../global/constants';
import { ICar, FuelType, TransmissionType, IColor } from '../../global/interfaces';
import Car from '../../components/Car/Car';

interface IBrand {
  name: string;
  model: string[];
}

const CarList: FC = () => {
  const { t } = useTranslation();
  const defaultPriceRange: number[] = [0, 2500];
  const defaultYearRange: number[] = [2014, 2024];
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>(defaultPriceRange);
  const [yearRange, setYearRange] = useState<number[]>(defaultYearRange);
  const [selectedTransmissionType, setSelectedTransmissionType] =
    useState<Nullable<TransmissionType>>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<Nullable<FuelType>>(null);
  const [selectedColors, setSelectedColors] = useState<IColor[]>([]);
  const [onlyAvaliable, setOnlyAvaliable] = useState<boolean>(false);

  const filteredMockData: ICar[] = mockData.filter((car: ICar) => car);

  const brands: IBrand[] = [
    {
      name: 'BMW',
      model: ['i5'],
    },
    {
      name: 'Audi',
      model: ['A3'],
    },
    {
      name: 'Ferrari',
      model: ['Spider'],
    },
  ];

  const models: string[] | undefined = brands.find(
    (brand: IBrand) => brand.name === selectedBrand,
  )?.model;

  const transmissionTypes: TransmissionType[] = ['Manual', 'Automatic', 'Hybrid'];
  const fuelTypes: FuelType[] = ['Electric', 'Petrol'];
  const colors: IColor[] = [
    { text: 'Black', hex: '#262626' },
    { text: 'White', hex: '#e5e5e5' },
    { text: 'Grey', hex: '#404040' },
  ];

  const handleResetAllFilter = (): void => {
    setSelectedBrand('');
    setSelectedModel('');
    setPriceRange(defaultPriceRange);
    setYearRange(defaultYearRange);
    setSelectedTransmissionType(null);
    setSelectedFuelType(null);
    setSelectedColors([]);
    setOnlyAvaliable(false);
  };

  const handleSearch = (): void => {
    console.log({
      selectedBrand,
      selectedModel,
      priceRange,
      yearRange,
      selectedTransmissionType,
      selectedFuelType,
      selectedColors,
      onlyAvaliable,
    });
  };

  const handleBrandValue = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
  };

  const handleModelValue = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedModel(e.target.value);
  };

  const handlePriceRangeValue = (e: number | number[]): void => {
    if (Array.isArray(e)) {
      setPriceRange(e);
    }
  };

  const handleYearRangeValue = (e: number | number[]): void => {
    if (Array.isArray(e)) {
      setYearRange(e);
    }
  };

  const handleTransmissionTypeValue = (e: Nullable<TransmissionType>): void => {
    setSelectedTransmissionType(e);
  };

  const handleFuelTypeValue = (e: Nullable<FuelType>): void => {
    setSelectedFuelType(e);
  };

  const handleColorValue = (e: ChangeEvent<HTMLSelectElement>): void => {
    const colorValues: string[] = e.target.value.split(',');
    const colorValue: IColor[] = colorValues.map(
      (splitedColor: string) => colors.find((color: IColor) => color.text === splitedColor)!,
    );

    setSelectedColors(colorValue);
  };

  const handleOnlyAvaliableValue = (): void => setOnlyAvaliable((preValue: boolean) => !preValue);

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
            selectedKeys={selectedBrand ? [selectedBrand] : []}
            onChange={handleBrandValue}
          >
            {brands.map((brand: IBrand) => (
              <SelectItem key={brand.name} value={brand.name}>
                {brand.name}
              </SelectItem>
            ))}
          </Select>
          {selectedBrand && !!models?.length && (
            <Select
              key={selectedBrand}
              label={t('car.model')}
              size='sm'
              selectedKeys={selectedModel ? [selectedModel] : []}
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
            value={priceRange}
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
            value={yearRange}
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
                color={selectedTransmissionType ? 'default' : 'secondary'}
                onClick={() => handleTransmissionTypeValue(null)}
              >
                {t('common.any')}
              </Chip>
              {transmissionTypes.map((transmissionType: TransmissionType) => (
                <Chip
                  key={transmissionType}
                  className='cursor-pointer'
                  color={selectedTransmissionType === transmissionType ? 'secondary' : 'default'}
                  onClick={() => handleTransmissionTypeValue(transmissionType)}
                >
                  {transmissionType}
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
                color={selectedFuelType ? 'default' : 'secondary'}
                onClick={() => handleFuelTypeValue(null)}
              >
                {t('common.any')}
              </Chip>
              {fuelTypes.map((fuelType: FuelType) => (
                <Chip
                  key={fuelType}
                  className='cursor-pointer'
                  color={selectedFuelType === fuelType ? 'secondary' : 'default'}
                  onClick={() => handleFuelTypeValue(fuelType)}
                >
                  {fuelType}
                </Chip>
              ))}
            </div>
          </div>
          <Divider />
          <Select
            label={t('car.color')}
            size='sm'
            selectionMode='multiple'
            selectedKeys={selectedColors.map((color: IColor) => color.text)}
            onChange={handleColorValue}
          >
            {colors.map((color: IColor) => (
              <SelectItem key={color.text} value={color.text}>
                {color.text}
              </SelectItem>
            ))}
          </Select>
          <Divider />
          <Switch color='secondary' isSelected={onlyAvaliable} onChange={handleOnlyAvaliableValue}>
            {t('car.onlyAvaliable')}
          </Switch>
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
