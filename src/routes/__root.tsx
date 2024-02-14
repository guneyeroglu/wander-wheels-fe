import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { Link, NextUIProvider } from '@nextui-org/react';

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <NextUIProvider
      navigate={(path: string) =>
        navigate({
          to: path,
        })
      }
    >
      <div className='dark'>
        <div className='p-2 flex gap-2'>
          <Link href='/' color='foreground' className='[&.active]:font-bold'>
            Home
          </Link>
          <Link href='/about' color='foreground' className='[&.active]:font-bold'>
            About
          </Link>
        </div>
        <hr />
        <main className='w-full max-w-screen-2xl p-2 m-auto text-center'>
          <Outlet />
        </main>
      </div>
    </NextUIProvider>
  );
}

export const Route = createRootRoute({
  component: RouteComponent,
});
