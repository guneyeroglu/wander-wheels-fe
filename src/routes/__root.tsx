import { FC } from 'react';
import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { NextUIProvider } from '@nextui-org/react';

import Header from '../components/Header/Header';

const RouteComponent: FC = () => {
  const navigate = useNavigate();

  return (
    <NextUIProvider
      navigate={(path: string) =>
        navigate({
          to: path,
        })
      }
    >
      <Header />
      <main className='w-full max-w-screen-2xl p-4 m-auto text-center max-md:px-2'>
        <Outlet />
      </main>
    </NextUIProvider>
  );
};

export const Route = createRootRoute({
  component: RouteComponent,
});
