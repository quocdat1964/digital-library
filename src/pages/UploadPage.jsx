import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFolders } from '../features/folders/foldersSlice';
import { uploadAndSaveFile, uploadAndSaveFileSuccess, uploadAndSaveFileFailure } from '../features/files/fileSlice';
import StagedFileCard from '../components/common/StagedFileCard';
import { ArrowUpTrayIcon, FolderPlusIcon, DocumentIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import pdf from '../assets/pdf.png'
import txt from '../assets/txt.png'
import img from '../assets/image.png'
import toast from 'react-hot-toast';

const UploadPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [stagedFiles, setStagedFiles] = useState([])
    const { user: currentUser } = useSelector((state) => state.auth)
    const { folderList = [] } = useSelector(state => state.folders || {})

    const { status: uploadStatus, error: uploadError } = useSelector(state => state.files)

    useEffect(() => {
        dispatch(fetchFolders())
        // dispatch(resetUploadState())
    }, [dispatch])

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => {
            let preview = null
            let thumbnail = null
            if(file.type.startsWith('image/')){
                preview = URL.createObjectURL(file)
                thumbnail = img
            } else if(file.type.startsWith('application/pdf')){
                preview = pdf
                thumbnail = pdf
            } else if(file.type.startsWith('text/')) {
                preview = txt
                thumbnail = txt
            }
            return {
                id: `temp_${Math.random().toString(36).substr(2, 9)}`,
                fileObject: file,
                previewUrl: preview,
                thumbnailUrl: thumbnail,
                name: file.name.split('.').slice(0, -1).join('.'), // Bỏ phần đuôi file
                description: '',
                author: '',
                folderId: null,
                isSelectedToSave: true,
            }
        })
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
        // if (fileToRemove) {
        //     URL.revokeObjectURL(fileToRemove.previewUrl)
        // }
        setStagedFiles(prev => prev.filter(file => file.id !== id))
    }

    const handleToggleSelect = (id) => {
        setStagedFiles(prev => prev.map(file =>
            file.id === id ? { ...file, isSelectedToSave: !file.isSelectedToSave } : file
        ))
    }

    const handleSave = () => {
        if (!currentUser) return
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

        filesToSave.forEach(file => {
            const payload = {
                fileObject: file.fileObject,
                name: file.name,
                description: file.description,
                author: file.author,
                folderId: file.folderId,
                uploaderId: currentUser.userId,
                thumbnailUrl: file.thumbnailUrl
            }
            dispatch(uploadAndSaveFile(payload))
        })
    }

    useEffect(() => {
        if (uploadStatus === 'succeeded') {
            setStagedFiles([])
            // dispatch(resetUploadState())
        } else if (uploadStatus === 'failed' && uploadError) {
        }
    }, [uploadStatus, uploadError, dispatch])

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
                <p className='mt-2'>Kéo thả hoặc click để chọn file</p>
            </div>

            {stagedFiles.length > 0 && (
                <div className='mt-8'>
                    <h2 className='text-xl font-semibold mb-4'>Xem trước và chỉnh sửa</h2>
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
                    <p className='text-yellow-300'>Bạn chưa có kho lưu trữ nào, hãy tạo 1 kho để lưu file</p>
                    <button
                        onClick={() => navigate('/archive')}
                        className='mt-2 inline-flex items-center bg-red-600 px-4 py-2 text-sm font-semibold text-white rounded-md hover:bg-red-700'
                    >
                        <FolderPlusIcon className='h-5 w-5 mr-2' />
                        Tới trang kho lưu trữ
                    </button>
                </div>
            )}

            {stagedFiles.length > 0 && (
                <div className="sticky bottom-0 bg-gray-900/80 backdrop-blur-sm p-4 -m-6 mt-8 flex justify-between items-center">
                    <p className='font-semibold'>{filesSelectedToSaveCount} file sẽ được lưu</p>
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