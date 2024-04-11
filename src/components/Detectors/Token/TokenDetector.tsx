import { FC, useEffect } from 'react';

import { useUserInfo } from '../../../store';
import { services } from '../../../global/services';

const TokenDetector: FC = (): null => {
  const token: string | null = localStorage.getItem('token');
  const { setUserInfo } = useUserInfo();

  const { data, refetch } = services.GetUserInfo({
    options: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  useEffect(() => {
    if (data) {
      setUserInfo(data.data);
    }
  }, [data, setUserInfo]);

  return null;
};

export default TokenDetector;
