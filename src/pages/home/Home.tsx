import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const HomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>{t('home.title')}</div>
      <div>{t('home.subtitle')}</div>
    </div>
  );
};

export default HomePage;
