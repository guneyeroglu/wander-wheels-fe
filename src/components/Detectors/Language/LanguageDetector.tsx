import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { instance } from '../../../global/interceptors';

const LanguageDetector: FC = (): null => {
  const { i18n } = useTranslation();

  useEffect(() => {
    instance.defaults.headers['Accept-Language'] = i18n.language ?? 'en_EN';
  }, [i18n.language]);

  return null;
};

export default LanguageDetector;
