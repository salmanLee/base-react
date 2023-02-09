import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from '@/pages/home';
import ErrorPage from '@/pages/404';
import config from './config';

const lazyload = (path: string) => {
  const Comp = lazy(() => import(`@/pages/${path}`));
  return (
    <Suspense>
      <Comp />
    </Suspense>
  );
};

function getRoutes() {
  const other = config.map((item) => ({ path: `/${item}`, element: lazyload(item) }));
  return [
    {
      path: '/',
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    ...other,
  ];
}

export default createBrowserRouter(getRoutes());
