import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../features/files/fileSlice';
import FileExplorerLayout from '../components/layout/fileExplorerLayout';

const HomePage = () => {
  const dispatch = useDispatch();
  
  // Component này chỉ cần lấy đúng phần state mà nó cần
  const { filesByDate, status, error } = useSelector((state) => state.files);

  // Gọi API khi component được mount
  useEffect(() => {
    // Thêm điều kiện để không fetch lại nếu dữ liệu đã có
    if (status === 'idle') {
      dispatch(fetchFiles());
    }
  }, [status, dispatch]);

  // Giao diện và logic phức tạp đã được đưa vào FileExplorerLayout
  return (
    <FileExplorerLayout
      pageTitle="Trang chủ"
      filesByDate={filesByDate}
      status={status}
      error={error}
    />
  );
};

export default HomePage;
