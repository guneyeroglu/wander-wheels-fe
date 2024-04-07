import { useFetch } from '../../hooks/useFetch';
import { IBrand } from '../../interfaces/services/brands';

export const GetAllBrands = () => {
  const brands = useFetch<IBrand[]>({
    queryKey: 'brands',
    url: '/brands',
  });

  return brands;
};
