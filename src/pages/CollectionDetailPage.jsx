import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCollectionDetails } from '../features/collections/collectionSlice';
import { fetchFiles } from '../features/files/fileSlice';
import { closeFileDetailPanel } from '../features/files/fileDetailSlice';
import FileExplorerLayout from '../components/layout/FileExplorerLayout';
import { format } from 'date-fns';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const CollectionDetailPage = () => {
    const dispatch = useDispatch()
    const { collectionId } = useParams()

    const { currentCollection, status: collectionStatus } = useSelector(state => state.collections)
    const { filesByDateInCollection, status, error} = useSelector((state) => state.files)

    const isLoading = collectionStatus === 'loading' || status === 'loading'

    if (isLoading) {
        return <div className='p-4 text-center'>Dang tai du lieu bo suu tap...</div>
    }

    if (!currentCollection) {
        return (
            <div className='p-4 text-center'>
                <p className='text-red-500'>Khong tim thay bo suu tap</p>
                <Link to='/collections' className="text-red-400 hover:underline mt-2 inline-block">Quay lai bo suu tap</Link>
            </div>
        )
    }

    const breadcrumbTitle = (
        <div className="flex items-center space-x-2 text-xl font-bold">
            <Link to='/collections' className='text-gray-400 hover:text-white hover:underline transition-colors'>
                Bộ sưu tập
            </Link>
            <ChevronRightIcon className='h-6 w-6 text-gray-500 flex-shrink-0'/>
            <span className='text-white truncate'>{currentCollection.name}</span>
        </div>
    )

    return (
        <FileExplorerLayout 
            pageTitle={breadcrumbTitle}
            filesByDate={filesByDateInCollection}
            status={status}
            error={error}
            isInCollection={true}
        />
    )
}

export default CollectionDetailPage