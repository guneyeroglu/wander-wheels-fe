import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { mockData } from '../../global/constants';
import { ICar } from '../../global/interfaces';
import Car from '../../components/Car/Car';
import { Card } from '@nextui-org/react';

const CarList: FC = () => {
  const { t } = useTranslation();
  const filteredMockData: ICar[] = mockData.filter((car: ICar) => car);

  return (
    <div className='w-full flex items-start justify-start gap-4'>
      <Card className='w-2/5'>aynen</Card>
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
