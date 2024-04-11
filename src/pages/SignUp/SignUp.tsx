import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@nextui-org/react';
import { useNavigate } from '@tanstack/react-router';

import { useUserInfo } from '../../store';
import { SignUpFrom } from '../../components/Forms';

const SignUp: FC = () => {
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
