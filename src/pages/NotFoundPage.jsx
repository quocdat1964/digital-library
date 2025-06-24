import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Không Tìm Thấy Trang</h2>
      <p className="mb-6">Rất tiếc, trang bạn đang tìm kiếm không tồn tại.</p>
      <Link 
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
      >
        Quay về Trang Chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;
