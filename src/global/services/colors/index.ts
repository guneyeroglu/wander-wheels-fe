import { useFetch } from '../../hooks/useFetch';
import { IColor } from '../../interfaces/services/colors';

export const GetAllColors = () => {
  const colors = useFetch<IColor[]>({
    queryKey: 'colors',
    url: '/colors',
  });

  return colors;
};
