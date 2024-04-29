import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from '@nextui-org/react';

import { HomeCar } from '../../assets/images';
import { RentForm } from '../../components/Forms';
import { useUserInfo } from '../../store';

const HomePage: FC = () => {
  const { t } = useTranslation();
  const { id } = useUserInfo();

  return (
    <>
      <div
        className='absolute inset-0 bg-no-repeat h-[100dvh] bg-cover opacity-35 -z-10'
        style={{ backgroundImage: `url('${HomeCar}')` }}
      ></div>
      <div className='w-full py-4 gap-4'>
        <article className='w-full mt-24 mb-8 max-xl:mt-12'>
          <span className='block text-5xl font-semibold mb-4 text-left w-2/5 max-md:w-full max-xl:text-3xl'>
            {t('home.title')}
          </span>
          <span className='block text-xl font-thin text-left w-3/5 max-md:w-full max-xl:text-base'>
            <Trans
              defaults={t('home.introduction')}
              components={{ h1: <h1 className='inline font-bold' /> }}
            />
          </span>
        </article>
        <span className='block text-xl mb-24 text-left max-xl:mb-12 max-xl:text-base'>
          {id ? (
            t('home.inviteWithUser')
          ) : (
            <Trans
              defaults={t('home.invite')}
              components={{
                link_1: (
                  <Link
                    href='/login'
                    className='font-bold text-xl max-xl:text-base'
                    color='foreground'
                  />
                ),
                link_2: (
                  <Link
                    href='/sign-up'
                    className='font-bold text-xl max-xl:text-base'
                    color='foreground'
                  />
                ),
              }}
            />
          )}
        </span>
        <section>
          <RentForm />
        </section>
      </div>
    </>
  );
};

export default HomePage;
