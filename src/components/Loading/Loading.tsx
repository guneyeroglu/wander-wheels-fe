import { FC, PropsWithChildren } from 'react';
import { GetUserInfo } from '../../global/services/users';
import { Spinner } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

const Loading: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const { isFetched } = GetUserInfo({
    options: {
      enabled: false,
    },
  });

  return (
    <>
      {!isFetched ? (
        <div className='fixed inset-0 flex items-center justify-center'>
          <Spinner
            size='lg'
            color='primary'
            label={t('common.loadingWanderWheels')}
            labelColor='primary'
            className='bg-neutral-800 p-4 rounded-lg'
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
