import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import { tr, en } from './languages';

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('lang') ?? 'en',
  fallbackLng: 'en',
  debug: true,
  resources: { en, tr },
});

export default i18n;
