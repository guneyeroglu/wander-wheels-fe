import { FC } from 'react';
import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { NextUIProvider } from '@nextui-org/react';

import Header from '../components/header/Header';

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
      <div className='dark text-foreground bg-background'>
        <Header />
        <main className='w-full max-w-screen-2xl py-2 px-4 m-auto text-center'>
          <Outlet />
        </main>
      </div>
    </NextUIProvider>
  );
};

export const Route = createRootRoute({
  component: RouteComponent,
});
