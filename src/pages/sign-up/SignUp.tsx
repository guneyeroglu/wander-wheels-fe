import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@nextui-org/react';

import { SignUpFrom } from '../../components/Forms';

const SignUp: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SignUpFrom />
      <div className='mt-4'>
        <span className='mr-2'>{t('common.alreadySign')}</span>
        <Link href='/login' underline='always' color='foreground'>
          {t('common.login')}
        </Link>
      </div>
    </>
  );
};

export default SignUp;
