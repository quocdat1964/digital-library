import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchFolderDetails } from '../features/folders/foldersSlice';
import { fetchFilesByFolder } from '../features/files/fileSlice';
import { closeFileDetailPanel } from '../features/files/fileDetailSlice';
import FileExplorerLayout from '../components/layout/FileExplorerLayout';
import { format } from 'date-fns';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const FolderDetailPage = () => {
    const dispatch = useDispatch()
    const { folderId } = useParams()
    const { currentFolder, status: folderStatus } = useSelector(state => state.folders)
    const { filesByDateInFolder, status, error} = useSelector((state) => state.files)

    const isLoading = folderStatus === 'loading' || status === 'loading'

    if (isLoading) {
        return <div className='p-4 text-center'>Dang tai du lieu thu muc</div>
    }

    if (!currentFolder) {
        return (
            <div className='p-4 text-center'>
                <p className='text-red-500'>Khong tim thay thu muc</p>
                <Link to='archive' className="text-red-400 hover:underline mt-2 inline-block">Quay lai kho luu tru</Link>
            </div>
        )
    }

    const breadcrumbTitle = (
        <div className="flex items-center space-x-2 text-xl font-bold">
            <Link to='/archive' className='text-gray-400 hover:text-white hover:underline transition-colors'>
                Kho lưu trữ
            </Link>
            <ChevronRightIcon className='h-6 w-6 text-gray-500 flex-shrink-0' />
            <span className='text-white truncate'>{currentFolder.name}</span>
        </div>
    )

    return (
        <FileExplorerLayout
            pageTitle={breadcrumbTitle}
            filesByDate={filesByDateInFolder}
            status={status}
            error={error}
        />
    )
}

export default FolderDetailPage