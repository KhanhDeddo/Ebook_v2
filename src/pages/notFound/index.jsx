import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Trang bạn tìm kiếm không tồn tại.</p>
      <Link to="/admin/dashboard">Quay về trang chủ</Link>
    </div>
  );
};

export default NotFound;
