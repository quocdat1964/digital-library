import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFolders, createFolder } from "../features/folders/foldersSlice";
import { FolderPlusIcon } from "@heroicons/react/24/solid";
import FolderCard from '../components/common/FolderCard';
import CreateFolderModal from '../components/common/CreateFolderModal';

const ArchivePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { folderList, status } = useSelector((state) => state.folders)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        dispatch(fetchFolders())
    }, [dispatch])

    const handleCreateFolder = (folderData) => {
        dispatch(createFolder(folderData))
    }

    const handleFolderClick = (folderId) => {
        // Điều hướng tới trang chi tiết folder
        console.log('Tempppp')
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Kho lưu trữ</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                    <FolderPlusIcon className="h-5 w-5 mr-2" />
                    Tạo thư mục mới
                </button>
            </div>

            {status === 'loading' && <p className="text-gray-400">Loading folders...</p>}

            {status === 'succeeded' && folderList.length === 0 && (
                <div className="text-center py-16 px-6 bg-gray-800/50 rounded-lg">
                    <FolderPlusIcon className="mx-auto h-12 w-12 text-gray-500" />
                    <h3 className="mt-2 text-lg font-medium text-white">Chưa có thư mục nào</h3>
                    <p className="mt-1 text-sm text-gray-400">Hãy bắt đầu bằng cách tạo một thư mục mới.</p>
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            <FolderPlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                            Tạo thư mục đầu tiên
                        </button>
                    </div>
                </div>
            )}

            {status === 'succeeded' && folderList.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {folderList.map(folder => (
                        <FolderCard key={folder.id} folder={folder} onClick={() => handleFolderClick(folder.id)} />
                    ))}
                </div>
            )}

            <CreateFolderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateFolder}
            />
        </div>
    )
}

export default ArchivePage