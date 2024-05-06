import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage, CarsNavigate, Cars, CarDetails, Login, SignUp } from '../pages';
import Header from '../components/Header/Header';

interface IRoute {
  path: string;
  element: JSX.Element;
}

const routes: IRoute[] = [
  { path: '/', element: <HomePage /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/login', element: <Login /> },
  { path: '/cars-navigate', element: <CarsNavigate /> },
  { path: '/cars', element: <Cars /> },
  { path: '/car-details/:carAndCityId', element: <CarDetails /> },
];

const RouteLayout: FC = () => {
  return (
    <>
      <Header />
      <main className='w-full max-w-screen-2xl p-4 m-auto text-center max-md:px-2'>
        <Routes>
          {routes.map((route: IRoute) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </>
  );
};

export default RouteLayout;
