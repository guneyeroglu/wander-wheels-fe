import { useFetch } from '../../hooks/useFetch';
import { ICity } from '../../interfaces/services/cities';

export const GetAllCities = () => {
  const brands = useFetch<ICity[]>({
    queryKey: 'cities',
    url: '/cities',
  });

  return brands;
};
