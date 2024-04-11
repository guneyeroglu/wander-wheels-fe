import { FC, useEffect } from 'react';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import { services } from './global/services';
import { useUserInfo } from './store';

const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App: FC = () => {
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

  return <RouterProvider router={router} />;
};

export default App;
