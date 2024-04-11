import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Accept-Language': localStorage.getItem('lang') ?? 'en_EN',
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
  },
});
