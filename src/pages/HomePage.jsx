import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../features/files/fileSlice';
import FileExplorerLayout from '../components/layout/FileExplorerLayout';
import { fetchFolders } from '../features/folders/foldersSlice';
import { fetchCollections } from '../features/collections/collectionSlice';
import { closeFileDetailPanel } from '../features/files/fileDetailSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { filesByDate, status, error } = useSelector((state) => state.files);

  useEffect(() => {
    dispatch(fetchFiles())
    dispatch(fetchFolders())
    dispatch(fetchCollections())
    dispatch(closeFileDetailPanel())
  }, [])

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
