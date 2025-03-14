import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from '~/pages/admin/dashboard';
import AdminLayout from '~/pages/admin/layout';
import AdminOrders from '~/pages/admin/orders';
import AdminProducts from '~/pages/admin/products';
import AdminProfile from '~/pages/admin/profile';
import AdminStatistics from '~/pages/admin/statistics';
import AdminUsers from '~/pages/admin/users';
import AdminVoucher from '~/pages/admin/vouchers';
import Login from '~/auth/login';
import Register from '~/auth/register';
import NotFound from '~/pages/notFound';
import Cart from '~/pages/user/cart';
import Dashboard from '~/pages/user/dashboard';
import UserLayout from '~/pages/user/layout';
import Orders from '~/pages/user/orders';
import Payments from '~/pages/user/payments';
import ProductDetails from '~/pages/user/productDetails';
import Products from '~/pages/user/products';
import Profile from '~/pages/user/profile';

const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/admin/dashboard" replace />} /> */}
        <Route path="*" element={<NotFound/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/* Routes cho admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="statistics" element={<AdminStatistics />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="vouchers" element={<AdminVoucher />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Routes cho user */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterConfig;
