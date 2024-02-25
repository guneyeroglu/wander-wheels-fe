import { Input, Link } from '@nextui-org/react';
import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const HomePage: FC = () => {
  const { t } = useTranslation();

  const today: string = new Date().toISOString().split('T')[0];
  const _nextYear: Date = new Date();
  _nextYear.setFullYear(_nextYear.getFullYear() + 1);
  const nextYear: string = _nextYear.toISOString().split('T')[0];

  return (
    <div className='w-full max-w-screen-lg m-auto'>
      <span className='block text-3xl mb-2'>{t('home.title')}</span>
      <span className='block text-2xl mb-2'>{t('home.subtitle')}</span>
      <span className='block text-xl mb-2'>
        <Trans
          defaults={t('home.introduction')}
          components={{ h1: <h1 className='inline font-bold' /> }}
        />
      </span>
      <span className='block text-xl mb-14'>
        <Trans
          defaults={t('home.introduction_2')}
          components={{
            link_1: <Link href='/login' className='font-bold' color='foreground' />,
            link_2: <Link href='/sign-up' className='font-bold' color='foreground' />,
          }}
        />
      </span>
      <div className='flex items-center justify-center gap-4'>
        <Input type='date' min={today} max={nextYear} />
        <Input type='date' min={today} max={nextYear} />
      </div>
    </div>
  );
};

export default HomePage;
