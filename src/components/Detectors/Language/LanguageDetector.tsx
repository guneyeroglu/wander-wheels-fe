import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { instance } from '../../../global/interceptors';

const LanguageDetector: FC = (): null => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const language: string = i18n.language ?? 'en_EN';

    instance.defaults.headers['Accept-Language'] = language;
    localStorage.setItem('language', language);
  }, [i18n.language]);

  return null;
};

export default LanguageDetector;
