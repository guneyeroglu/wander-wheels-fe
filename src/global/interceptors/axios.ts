import axios from 'axios';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  },
});

export const LanguageDetector: FC = (): null => {
  const { i18n } = useTranslation();

  useEffect(() => {
    instance.defaults.headers['Accept-Language'] = i18n.language ?? 'en_EN';
  }, [i18n.language]);

  return null;
};
