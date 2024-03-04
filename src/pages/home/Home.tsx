import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Image, Input, Link } from '@nextui-org/react';

import { HomeCar } from '../../assets/images';

const HomePage: FC = () => {
  const { t } = useTranslation();

  const today: string = new Date().toISOString().split('T')[0];
  const _nextYear: Date = new Date();
  _nextYear.setFullYear(_nextYear.getFullYear() + 1);
  const nextYear: string = _nextYear.toISOString().split('T')[0];

  return (
    <div className='w-full flex items-center justify-between py-4 gap-4'>
      <div>
        <article className='w-[60%] '>
          <span className='block text-4xl font-semibold mb-4 text-left'>{t('home.title')}</span>
          <span className='block text-sm text-left'>
            <Trans
              defaults={t('home.introduction')}
              components={{ h1: <h1 className='inline font-bold' /> }}
            />
          </span>
        </article>
        <aside className='w-[40%] flex items-center justify-center'>
          <Image src={HomeCar} alt='home-car' width={500} />
        </aside>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <Input type='date' min={today} max={nextYear} />
        <Input type='date' min={today} max={nextYear} />
      </div>
      <span className='block text-xl mb-14'>
        <Trans
          defaults={t('home.invite')}
          components={{
            link_1: <Link href='/login' className='font-bold' color='foreground' />,
            link_2: <Link href='/sign-up' className='font-bold' color='foreground' />,
          }}
        />
      </span>
    </div>
  );
};

export default HomePage;
