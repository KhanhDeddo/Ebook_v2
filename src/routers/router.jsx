import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '~/auth/login';
import Dashboard from '~/pages/admin/dashboard';
import AdminLayout from '~/pages/admin/layout';
import Orders from '~/pages/admin/orders';
import Products from '~/pages/admin/products';
import Profile from '~/pages/admin/profile';
import Statistics from '~/pages/admin/statistics';
import Users from '~/pages/admin/users';
import Voucher from '~/pages/admin/vouchers';


const adminRoutes = [
  { path: '/', component: <Dashboard /> },
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/statistics', component: <Statistics/> },
  { path: '/orders', component: <Orders/> },
  { path: '/vouchers', component: <Voucher/> },
  { path: '/products', component: <Products/> },
  { path: '/users', component: <Users/> },
  { path: '/profile', component: <Profile/> },
  { path: '/login', component: <Login/> },
  { path: '/admin/profile', component: <Profile/> },
];
const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        {adminRoutes.map((route, index) => (
          <Route 
            key={index} 
            path={route.path} 
            element={ route.path !== '/login' ?
              <AdminLayout>{route.component}</AdminLayout>
              :route.component
            } 
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default RouterConfig;