import { useEffect, useRef } from "react";
import {
    ArchiveBoxArrowDownIcon,
    FolderPlusIcon,
    PrinterIcon,
    TagIcon,
    ArrowDownTrayIcon,
    PencilIcon,
    PencilSquareIcon,
    TrashIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/outline';

const ContextMenu = ({ menuState, closeMenu, onDeleteClick, onMoveToFolderClick, onAddToCollectionClick, currentUser }) => {
    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu()
            }
        }

        if (menuState.show) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [menuState.show, closeMenu])

    if (!menuState.show) {
        return null
    }

    const file = menuState.file
    if (!file) return null

    const canPerformActions = currentUser && file &&
        (currentUser.id === file.ownerId || currentUser.role === 'admin' || currentUser.role === 'boss');

    const handleItemClick = (action) => {
        const file = menuState.file
        if (!file) return
        switch (action) {
            case 'delete':
                onDeleteClick(file)
                break;
            case 'moveToFolder':
                onMoveToFolderClick(file)
                break
            case 'addToCollection':
                onAddToCollectionClick(file)
                break
            default:
                break
        }
        closeMenu()
    }

    return (
        <div
            ref={menuRef}
            className="fixed z-50 w-64 bg-[#2d2c35] rounded-lg shadow-lg p-2 text-white text-sm"
            style={{ top: menuState.y, left: menuState.x }}
        >
            <div className="px-2 pb-2 mb-2 border-b border-gray-600">
                <p className="font-bold truncate">{menuState.file?.name}</p>
                <p className="text-xs text-gray-400">Ngày: {new Date(menuState.file?.createAt).toLocaleString('vi-VN')}</p>
            </div>

            {canPerformActions ? (
                <ul>
                    <li onClick={() => handleItemClick('moveToFolder')} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-600/50">
                        <ArchiveBoxArrowDownIcon className="h-5 w-5 mr-3" />
                        <span>Di chuyển vào kho</span>
                    </li>
                    <li onClick={() => handleItemClick('addToCollection')} className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-600/50">
                        <FolderPlusIcon className="h-5 w-5 mr-3" />
                        <span>Thêm vào bộ sưu tập</span>
                    </li>
                    <div className="my-1 h-px bg-gray-700"></div> {/* Dòng kẻ phân cách */}
                    <li onClick={() => handleItemClick('delete')} className="flex items-center p-2 rounded-md cursor-pointer text-red-400 hover:bg-red-500/20">
                        <TrashIcon className="h-5 w-5 mr-3" />
                        <span>Xóa file</span>
                    </li>
                </ul>
            ) : (
                <div>Bạn không có quyền thực hiện trên file này</div>
            )}

        </div>
    )
}

export default ContextMenu