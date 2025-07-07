import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchFolderDetails } from '../features/folders/foldersSlice';
import { fetchFiles } from '../features/files/fileSlice';
import FileExplorerLayout from '../components/layout/FileExplorerLayout';
import { format } from 'date-fns';

const FolderDetailPage = () => {
    const dispatch = useDispatch()
    const { folderId } = useParams()

    const { currentFolder, status: folderStatus } = useSelector(state => state.folders)
    const { allFiles, status: fileStatus } = useSelector(state => state.files)

    useEffect(() => {
        if (folderId) {
            dispatch(fetchFolderDetails(folderId))
        }
        dispatch(fetchFiles())
    }, [dispatch, folderId])

    const filesForThisFolder = useMemo(() => {
        if (!allFiles || allFiles.length === 0) return {}

        const filtered = allFiles.filter(file => file.folderId === folderId)

        return filtered.reduce((acc, file) => {
            const dateKey = format(new Date(file.createdAt), 'dd/MM/yyyy')
            if (!acc[dateKey]) acc[dateKey] = []
            acc[dateKey].push(file)
            return acc
        }, {})
    }, [allFiles, folderId])

    const isLoading = folderStatus === 'loading' || fileStatus === 'loading'

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

    return (
        <FileExplorerLayout 
            pageTitle={currentFolder.name}
            filesByDate={filesForThisFolder}
            status='succeeded'
            error={null}
        />
    )
}

export default FolderDetailPage