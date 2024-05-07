import { FC } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Skeleton,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

const SkeletonCars: FC = () => {
  const { t } = useTranslation();
  const mockCars: number[] = [0, 1];
  const isLoaded: boolean = false;

  return (
    <div className='flex flex-wrap items-center justify-center'>
      {mockCars.map((mockCar: number) => (
        <div key={mockCar} className='p-2 w-1/2 h-full relative max-sm:w-full'>
          <div className='w-full h-full cursor-pointer'>
            <Card
              shadow='sm'
              className='w-full border-t-1.5 border-b-1.5 border-neutral-600 border-solid'
            >
              <CardHeader className='flex flex-col items-start justify-center'>
                <div className='w-full flex items-center justify-between my-2 gap-2'>
                  <Skeleton isLoaded={isLoaded}>
                    <h3 className='text-3xl font-medium text-neutral-200'>{t('common.noData')}</h3>
                  </Skeleton>
                </div>
                <Skeleton>
                  <span className='text-xl font-normal text-neutral-200 opacity-75'>
                    {t('common.noData')}
                  </span>
                </Skeleton>
              </CardHeader>
              <CardBody className='overflow-hidden relative'>
                <Image
                  isBlurred
                  width={'100%'}
                  height={280}
                  className='h-[280px] object-cover object-center'
                  classNames={{
                    wrapper: 'overflow-hidden w-full h-full rounded-large',
                  }}
                  isLoading={!isLoaded}
                />
              </CardBody>
              <Divider className='h-[1.5px] bg-neutral-600' />
              <CardFooter className='flex flex-col items-start justify-center'>
                <div className='w-full text-start'>
                  <span className='inline-block text-left mb-2 opacity-75'>
                    <Skeleton isLoaded={isLoaded}>{t('common.noData')}</Skeleton>
                  </span>
                  <div className='flex flex-wrap items-center justify-start gap-4 overflow-visible mb-2'>
                    <Skeleton isLoaded={isLoaded}>{t('common.noData')}</Skeleton>
                    <Skeleton isLoaded={isLoaded}>{t('common.noData')}</Skeleton>
                    <Skeleton isLoaded={isLoaded}>{t('common.noData')}</Skeleton>
                  </div>
                  <div className='flex items-center justify-left'>
                    <Skeleton isLoaded={isLoaded}>
                      <span className='text-3xl text-neutral-100'>{t('common.noData')}</span>
                    </Skeleton>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCars;
