import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from '@nextui-org/react';

import { HomeCar } from '../../assets/images';
import { RentForm } from '../../components/Forms';

const HomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div
        className='absolute inset-0 bg-no-repeat h-[100dvh] bg-cover opacity-35 -z-10'
        style={{ backgroundImage: `url('${HomeCar}')` }}
      ></div>
      <div className='w-full py-4 gap-4'>
        <article className='w-full mt-24 mb-8'>
          <span className='block text-5xl font-semibold mb-4 text-left w-2/5'>
            {t('home.title')}
          </span>
          <span className='block text-xl font-thin text-left w-3/5'>
            <Trans
              defaults={t('home.introduction')}
              components={{ h1: <h1 className='inline font-bold' /> }}
            />
          </span>
        </article>
        <span className='block text-xl mb-24 text-left'>
          <Trans
            defaults={t('home.invite')}
            components={{
              link_1: <Link href='/login' className='font-bold text-xl' color='foreground' />,
              link_2: <Link href='/sign-up' className='font-bold text-xl' color='foreground' />,
            }}
          />
        </span>
        <section>
          <RentForm />
        </section>
      </div>
    </>
  );
};

export default HomePage;
