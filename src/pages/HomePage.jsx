import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../features/files/fileSlice';
import FileExplorerLayout from '../components/layout/FileExplorerLayout';
import { fetchFolders } from '../features/folders/foldersSlice';
import { fetchCollections } from '../features/collections/collectionSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth)
  const { filesByDate, status, error } = useSelector((state) => state.files);
  const { folderStatus } = useSelector((state) => state.folders);
  const { collectionStatus } = useSelector((state) => state.collections);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFiles());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (folderStatus === 'idle') {
      dispatch(fetchFolders())
    }
  }, [folderStatus, dispatch])

  useEffect(() => {
    if (collectionStatus === 'idle') {
      dispatch(fetchCollections())
    }
  }, [collectionStatus, dispatch])

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
