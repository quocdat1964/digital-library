import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchCollections,
    createCollection,
    updateCollection,
    deleteCollection,
} from "../features/collections/collectionSlice";
import FolderCard from '../components/common/FolderCard'
import CreateFolderModal from "../components/common/CreateFolderModal";
import EditFolderModal from "../components/common/EditFolderModal";
import ConfirmationModal from '../components/common/ConfirmationModal'
import FolderContextMenu from '../components/common/FolderContextMenu'
import { useContextMenu } from '../hooks/useContextMenu'
import { FolderPlusIcon } from "@heroicons/react/24/solid";

const CollectionsPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { collectionList, status } = useSelector((state) => state.collections)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editModal, setEditModal] = useState({ isOpen: false, folder: null })
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, folder: null })
    const { menuState, showContextMenu, closeContextMenu } = useContextMenu()

    useEffect(() => {
        dispatch(fetchCollections())
    }, [dispatch])

    const handleCreate = (data) => dispatch(createCollection(data))
    const handleUpdate = (data) => {
        dispatch(updateCollection(data))
        setEditModal({ isOpen: false, folder: null })
    }
    const handleConfirmDelete = () => {
        if (deleteModal.folder) {
            dispatch(deleteCollection(deleteModal.folder.id))
        }
        setDeleteModal({ isOpen: false, folder: null })
    }

    const handleClick = (id) => {
        console.log(`Navigating to collection ${id}`);
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Bộ sưu tập</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                    <FolderPlusIcon className="h-5 w-5 mr-2" />
                    Tạo bộ sưu tập mới
                </button>
            </div>

            {status === 'loading' && <p className="text-gray-400">Loading collections...</p>}

            {status === 'succeeded' && collectionList.length === 0 && (
                <div className="text-center py-16 px-6 bg-gray-800/50 rounded-lg">
                    <FolderPlusIcon className="mx-auto h-12 w-12 text-gray-500" />
                    <h3 className="mt-2 text-lg font-medium text-white">Chưa có bộ sưu tập nào</h3>
                    <p className="mt-1 text-sm text-gray-400">Hãy bắt đầu bằng cách tạo một bộ sưu tập mới.</p>
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={() => setIsCreateModalOpen(true)}
                            className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            <FolderPlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                            Tạo thư mục đầu tiên
                        </button>
                    </div>
                </div>
            )}

            {status === 'succeeded' && collectionList.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {collectionList.map(collection => (
                        <FolderCard
                            key={collection.id}
                            folder={collection}
                            onClick={() => handleClick(collection.id)}
                            onContextMenu={showContextMenu}
                            showPrivacy={false}
                        />
                    ))}
                </div>
            )}

            <CreateFolderModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreate}
                showPrivacyOptions={false}
            />
            <EditFolderModal
                isOpen={editModal.isOpen}
                onClose={() => setEditModal({ isOpen: false, folder: null })}
                onSave={handleUpdate}
                folder={editModal.folder}
                showPrivacyOptions={false}
            />
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, folder: null })}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa bộ sưu tập"
            >
                <p>Bạn có chắc chắn muốn xóa bộ sưu tập <strong className="text-white">{deleteModal.folder?.name}</strong> không?</p>
                <p className="mt-2 text-sm text-yellow-500">Lưu ý: Các file bên trong sẽ không bị xóa.</p>
            </ConfirmationModal>
            <FolderContextMenu
                menuState={menuState}
                closeMenu={closeContextMenu}
                onEditClick={(folder) => setEditModal({ isOpen: true, folder })}
                onDeleteClick={(folder) => setDeleteModal({ isOpen: true, folder })}
            />
        </div>
    )
}

export default CollectionsPage