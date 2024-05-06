import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useUserInfo } from '../../store';
import { LoginForm } from '../../components/Forms';

const Login: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { username } = useUserInfo();

  useEffect(() => {
    if (username) {
      navigate('/');
    }
  }, [username, navigate]);

  return (
    <>
      <LoginForm />
      <div className='mt-4'>
        <span className='mr-2'>{t('common.noAccountYet')}</span>
        <Link to='/sign-up' className='underline underline-offset-2'>
          {t('common.signUp')}
        </Link>
      </div>
    </>
  );
};

export default Login;
