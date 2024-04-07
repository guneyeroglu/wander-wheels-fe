import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import { tr, en } from './languages';

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('lang') ?? 'en_EN',
  fallbackLng: 'en_EN',
  debug: false,
  resources: {
    en_EN: en,
    tr_TR: tr,
  },
});

export default i18n;
