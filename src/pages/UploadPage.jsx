import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFolders } from '../features/folders/foldersSlice';
import { uploadFiles, resetUploadState } from '../features/upload/uploadSlice';
import StagedFileCard from '../components/common/StagedFileCard';
import { ArrowUpTrayIcon, FolderPlusIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

const UploadPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [stagedFiles, setStagedFiles] = useState([])

    const { folderList = [] } = useSelector(state => state.folders || {})

    const { status: uploadStatus, progress, error: uploadError } = useSelector(state => state.upload)

    console.log('[UploadPage] Đang render. Số lượng thư mục (folderList):', folderList.length);

    useEffect(() => {
        dispatch(fetchFolders())
        dispatch(resetUploadState())
    }, [dispatch])

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => ({
            id: `temp_${Math.random().toString(36).substr(2, 9)}`,
            fileObject: file,
            previewUrl: URL.createObjectURL(file),
            name: file.name.split('.').slice(0, -1).join('.'), // Bỏ phần đuôi file
            description: '',
            author: '',
            folderId: null,
            isSelectedToSave: true,
        }))
        setStagedFiles(prev => [...prev, ...newFiles])
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleUpdateStagedFile = (id, field, value) => {
        setStagedFiles(prev => prev.map(file =>
            file.id === id ? { ...file, [field]: value } : file
        ))
    }

    const handleRemoveStagedFile = (id) => {
        const fileToRemove = stagedFiles.find(f => f.id === id)
        if (fileToRemove) {
            URL.revokeObjectURL(fileToRemove.previewUrl)
        }
        setStagedFiles(prev => prev.filter(file => file.id !== id))
    }

    const handleToggleSelect = (id) => {
        console.log("Check folder list 2: ", folderList)
        setStagedFiles(prev => prev.map(file =>
            file.id === id ? { ...file, isSelectedToSave: !file.isSelectedToSave } : file
        ))
    }

    const handleSave = () => {
        const filesToSave = stagedFiles.filter(f => f.isSelectedToSave)
        if (filesToSave.length === 0) {
            toast.error('Vui long chon it nhat 1 file de luu')
            return
        }

        const allHaveFolder = filesToSave.every(f => f.folderId)
        if (!allHaveFolder) {
            toast.error('Vui long chon kho luu tru cho tat ca file duoc chon')
            return
        }
        dispatch(uploadFiles(filesToSave))
    }

    useEffect(() => {
        if (uploadStatus === 'succeeded') {
            toast.success('Upload thanh cong')
            setStagedFiles([])
            dispatch(resetUploadState())
        }
    }, [uploadStatus, dispatch])

    const filesSelectedToSaveCount = stagedFiles.filter(f => f.isSelectedToSave).length;

    return (
        <div className='p-4 sm:p-6 text-white'>
            <h1 className='text-2xl font-bold mb-6'>Upload File</h1>

            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${isDragActive ? 'border-red-500 bg-gray-800' : 'border-gray-600 hover:border-gray-500'}`}
            >
                <input {...getInputProps()} />
                <ArrowUpTrayIcon className="h-12 w-12 mx-auto text-gray-400" />
                <p className='mt-2'>Keo tha hoac click de chon file</p>
            </div>

            {stagedFiles.length > 0 && (
                <div className='mt-8'>
                    <h2 className='text-xl font-semibold mb-4'>Xem truoc va chinh sua</h2>
                    <div className='space-y-4'>
                        {stagedFiles.map(file => (
                            <StagedFileCard
                                key={file.id}
                                stagedFile={file}
                                onUpdate={(field, value) => handleUpdateStagedFile(file.id, field, value)}
                                onRemove={() => handleRemoveStagedFile(file.id)}
                                onToggleSelect={() => handleToggleSelect(file.id)}
                                folderList={folderList}
                            />
                        ))}
                    </div>
                </div>
            )}

            {folderList.length === 0 && stagedFiles.length > 0 && (
                <div className="mt-6 text-center p-4 bg-yellow-900/50 rounded-lg">
                    <p className='text-yellow-300'>Ban chua co kho luu tru nao, hay tao 1 kho truoc khi luu file</p>
                    <button
                        onClick={() => navigate('/archive')}
                        className='mt-2 inline-flex items-center bg-red-600 px-4 py-2 text-sm font-semibold text-white rounded-md hover:bg-red-700'
                    >
                        <FolderPlusIcon className='h-5 w-5 mr-2'/>
                        Toi trang Kho luu tru
                    </button>
                </div>
            )}

            {stagedFiles.length > 0 && (
                <div className="sticky bottom-0 bg-gray-900/80 backdrop-blur-sm p-4 -m-6 mt-8 flex justify-between items-center">
                    <p className='font-semibold'>{filesSelectedToSaveCount} file se duoc luu</p>
                    <button
                        onClick={handleSave}
                        disabled={uploadStatus === 'uploading' || filesSelectedToSaveCount === 0}
                        className="bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {uploadStatus === 'uploading' ? `Đang tải... (${Math.round(progress)}%)` : 'Lưu vào kho'}
                    </button>
                </div>
            )}
            {uploadError && <p className="text-red-500 mt-4">Lỗi: {uploadError}</p>}
        </div>
    )
}

export default UploadPage