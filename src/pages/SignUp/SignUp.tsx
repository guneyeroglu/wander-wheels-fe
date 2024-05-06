import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useUserInfo } from '../../store';
import { SignUpFrom } from '../../components/Forms';

const SignUp: FC = () => {
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
      <SignUpFrom />
      <div className='mt-4'>
        <span className='mr-2'>{t('common.alreadySign')}</span>
        <Link to='/login' className='underline underline-offset-2'>
          {t('common.login')}
        </Link>
      </div>
    </>
  );
};

export default SignUp;
