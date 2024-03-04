import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Input, Link } from '@nextui-org/react';

import { HomeCar } from '../../assets/images';

const HomePage: FC = () => {
  const { t } = useTranslation();

  const today: string = new Date().toISOString().split('T')[0];
  const _nextYear: Date = new Date();
  _nextYear.setFullYear(_nextYear.getFullYear() + 1);
  const nextYear: string = _nextYear.toISOString().split('T')[0];

  return (
    <div className='w-full py-4 gap-4'>
      <div
        className='absolute inset-0 bg-no-repeat h-[100dvh] bg-cover opacity-35'
        style={{ backgroundImage: `url('${HomeCar}')` }}
      ></div>
      <article className='w-full'>
        <span className='block text-4xl font-semibold mb-4 text-center'>{t('home.title')}</span>
        <span className='block text-sm text-left'>
          <Trans
            defaults={t('home.introduction')}
            components={{ h1: <h1 className='inline font-bold' /> }}
          />
        </span>
      </article>
      <span className='block text-xl mb-14'>
        <Trans
          defaults={t('home.invite')}
          components={{
            link_1: <Link href='/login' className='font-bold' color='foreground' />,
            link_2: <Link href='/sign-up' className='font-bold' color='foreground' />,
          }}
        />
      </span>
      <section className='flex items-center justify-center gap-4'>
        <Input type='date' min={today} max={nextYear} label='aynen' labelPlacement='outside-left' />
        <Input type='date' min={today} max={nextYear} />
      </section>
    </div>
  );
};

export default HomePage;
