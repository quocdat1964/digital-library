import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../features/files/fileSlice';
import FileExplorerLayout from '../components/layout/FileExplorerLayout';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth)
  const { filesByDate, status, error } = useSelector((state) => state.files);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFiles());
    }
  }, [status, dispatch]);

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
