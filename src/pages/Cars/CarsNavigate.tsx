import { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { utils } from '../../global/functions';
import { ICarFilter } from '../../global/interfaces';

const CarsNavigate: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cityId: Nullable<number> = searchParams.get('cityId')
    ? Number(searchParams.get('cityId'))
    : null;
  const startDate: Nullable<string> = searchParams.get('startDate') ?? null;
  const endDate: Nullable<string> = searchParams.get('endDate') ?? null;

  useEffect(() => {
    if (utils.isNumber(cityId) && utils.isDate(startDate) && utils.isDate(endDate)) {
      const carFilter: ICarFilter = JSON.parse(localStorage.getItem('carFilter') ?? '{}');
      localStorage.setItem(
        'carFilter',
        JSON.stringify({ ...carFilter, cityId, startDate, endDate }),
      );

      navigate('/cars', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [cityId, endDate, startDate, navigate]);

  return null;
};

export default CarsNavigate;
