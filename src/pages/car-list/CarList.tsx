import { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Select,
  SelectItem,
  Slider,
  SliderValue,
} from '@nextui-org/react';
import { ArrowsCounterClockwise } from '@phosphor-icons/react';

import { mockData } from '../../global/constants';
import { ICar, TFuelType, TTransmissionType } from '../../global/interfaces';
import Car from '../../components/Car/Car';

interface IBrand {
  name: string;
  model: string[];
}

const CarList: FC = () => {
  const { t } = useTranslation();
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedTransmissionType, setSelectedTransmissionType] =
    useState<TTransmissionType | null>(null);
  const [selectedFuelType, setSelectedFuelType] = useState<TFuelType | null>(null);
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

  const transmissionTypes: TTransmissionType[] = ['Manual', 'Automatic', 'Hybrid'];
  const fuelTypes: TFuelType[] = ['Electric', 'Petrol'];

  const handleResetAllFilter = (): void => {
    console.log('cleared');
  };

  const onChangeBrand = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedBrand(e.target.value);
  };

  const handleTransmissionType = (e: TTransmissionType | null) => {
    setSelectedTransmissionType(e);
  };

  const handleFuelType = (e: TFuelType | null) => {
    setSelectedFuelType(e);
  };

  return (
    <div className='w-full flex items-start justify-start gap-4'>
      <Card className='w-2/5'>
        <CardHeader>
          <div className='w-full flex items-center justify-between'>
            <span>{t('common.filters')}</span>
            <Button variant='light' onClick={handleResetAllFilter}>
              <ArrowsCounterClockwise name='Aynen' />
              <span>{t('common.resetAll')}</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody className='gap-4'>
          <Select label={t('car.brand')} onChange={onChangeBrand}>
            {brands.map((brand: IBrand) => (
              <SelectItem key={brand.name} value={brand.name}>
                {brand.name}
              </SelectItem>
            ))}
          </Select>
          <Divider />
          {selectedBrand && models?.length && (
            <>
              <Select key={selectedBrand} label={t('car.model')} disabled={!!selectedBrand}>
                {models?.map((model: string) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </Select>
              <Divider />
            </>
          )}
          <Slider
            label={t('car.priceRange')}
            step={50}
            minValue={0}
            maxValue={2500}
            defaultValue={[0, 2500]}
            formatOptions={{ style: 'currency', currency: 'USD' }}
          />
          <Divider />
          <Slider
            label={t('car.yearRange')}
            step={1}
            minValue={2014}
            maxValue={2024}
            defaultValue={[2014, 2024]}
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
          />
          <Divider />
          <span>{t('car.transmissionType')}</span>
          <div className='w-full flex flex-wrap items-center justify-start gap-2'>
            <Chip
              className='cursor-pointer'
              color={selectedTransmissionType ? 'default' : 'secondary'}
              onClick={() => handleTransmissionType(null)}
            >
              {t('common.any')}
            </Chip>
            {transmissionTypes.map((transmissionType: TTransmissionType) => (
              <Chip
                key={transmissionType}
                className='cursor-pointer'
                color={selectedTransmissionType === transmissionType ? 'secondary' : 'default'}
                onClick={() => handleTransmissionType(transmissionType)}
              >
                {transmissionType}
              </Chip>
            ))}
          </div>
          <Divider />
          <span>{t('car.fuelType')}</span>
          <div className='w-full flex flex-wrap items-center justify-start gap-2'>
            <Chip
              className='cursor-pointer'
              color={selectedFuelType ? 'default' : 'secondary'}
              onClick={() => handleFuelType(null)}
            >
              {t('common.any')}
            </Chip>
            {fuelTypes.map((fuelType: TFuelType) => (
              <Chip
                key={fuelType}
                className='cursor-pointer'
                color={selectedFuelType === fuelType ? 'secondary' : 'default'}
                onClick={() => handleFuelType(fuelType)}
              >
                {fuelType}
              </Chip>
            ))}
          </div>
        </CardBody>
      </Card>
      <div className='w-3/5'>
        <div className='mb-4 text-left px-2'>
          <span className='font-normal text-xl'>{`${t('car.searchResults')} `}</span>
          <span className='font-semibold text-xl'>{`(${filteredMockData.length})`}</span>
        </div>
        <div className='flex flex-wrap items-center justify-start'>
          {filteredMockData.map((car: ICar) => (
            <Car key={car.id} {...car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarList;
