import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchCollectionDetails } from '../features/collections/collectionSlice';
import { fetchFiles } from '../features/files/fileSlice';
import FileExplorerLayout from '../components/layout/FileExplorerLayout';
import { format } from 'date-fns';

const CollectionDetailPage = () => {
    const dispatch = useDispatch()
    const { collectionId } = useParams()

    const { currentCollection, status: collectionStatus } = useSelector(state => state.collections)
    const { allFiles, status: fileStatus } = useSelector(state => state.files)

    useEffect(() => {
        if (collectionId) {
            dispatch(fetchCollectionDetails(collectionId))
        }
        dispatch(fetchFiles())
    }, [dispatch, collectionId])

    const filesForThisCollection = useMemo(() => {
        if (!allFiles || allFiles.length === 0) return {}

        const filtered = allFiles.filter(file => file.collectionId === collectionId)

        return filtered.reduce((acc, file) => {
            const dateKey = format(new Date(file.createdAt), 'dd/MM/yyyy')
            if (!acc[dateKey]) acc[dateKey] = []
            acc[dateKey].push(file)
            return acc
        }, {})
    }, [allFiles, collectionId])

    const isLoading = collectionStatus === 'loading' || fileStatus === 'loading'

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

    return (
        <FileExplorerLayout 
            pageTitle={currentCollection.name}
            filesByDate={filesForThisCollection}
            status='succeeded'
            error={null}
        />
    )
}

export default CollectionDetailPage