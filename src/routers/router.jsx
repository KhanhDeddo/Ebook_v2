import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '~/pages/admin/dashboard';
import AdminLayout from '~/pages/admin/layout';
import Products from '~/pages/admin/products';
import Profile from '~/pages/admin/profile';
import Statistics from '~/pages/admin/statistics';
import Voucher from '~/pages/admin/vouchers';


const adminRoutes = [
  { path: '/', component: <Dashboard /> },
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/statistics', component: <Statistics/> },
  { path: '/orders', component: <Statistics/> },
  { path: '/vouchers', component: <Voucher/> },
  { path: '/products', component: <Products/> },
  { path: '/users', component: <Statistics/> },
  { path: '/profile', component: <Profile/> },
  { path: '/login', component: <Profile/> },
  { path: '/admin/profile', component: <Profile/> },
];
const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        {adminRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<AdminLayout>{route.component}</AdminLayout>} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default RouterConfig;