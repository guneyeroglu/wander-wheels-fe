import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@nextui-org/react';
import { useNavigate } from '@tanstack/react-router';

import { useUserInfo } from '../../store';
import { LoginForm } from '../../components/Forms';

const Login: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { username } = useUserInfo();

  useEffect(() => {
    if (username) {
      navigate({
        to: '/',
      });
    }
  }, [username, navigate]);

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
