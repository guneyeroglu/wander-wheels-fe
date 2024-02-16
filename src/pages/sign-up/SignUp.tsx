import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Form from '../../components/form/Form';
import { Link } from '@nextui-org/react';

const SignUp: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Form title={t('common.signUp')} />
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
