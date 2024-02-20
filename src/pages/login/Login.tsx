import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@nextui-org/react';

import { LoginForm } from '../../components/forms';

const Login: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <LoginForm />
      <div className='mt-4'>
        <span className='mr-2'>{t('common.noAccountYet')}</span>
        <Link href='/sign-up' underline='always' color='foreground'>
          {t('common.signUp')}
        </Link>
      </div>
    </>
  );
};

export default Login;
