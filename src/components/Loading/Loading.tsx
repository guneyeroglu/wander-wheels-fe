import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Spinner } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

import { HomeCar } from '../../assets/images';

const Loading: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearInterval(loadingInterval);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center z-[9999] bg-neutral-900'>
          <div
            className='absolute inset-0 bg-no-repeat bg-cover opacity-35 -z-10'
            style={{ backgroundImage: `url('${HomeCar}')` }}
          />
          <Spinner
            size='lg'
            color='primary'
            label={t('common.loadingWanderWheels')}
            labelColor='primary'
            className='bg-neutral-900/95 p-4 rounded-lg text-red-700'
          />
        </div>
      )}
      {children}
    </>
  );
};

export default Loading;
