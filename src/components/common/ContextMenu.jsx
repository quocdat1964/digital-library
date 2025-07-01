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

const ContextMenu = ({ menuState, closeMenu, onDeleteClick }) => {
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

    const menuItems = [
        { label: 'Di chuyển vào kho', icon: ArchiveBoxArrowDownIcon },
        { label: 'Thêm vào Bộ sưu tập', icon: FolderPlusIcon },
        // { label: 'Gửi nhà in', icon: PrinterIcon },
        // { label: 'Thêm từ khóa', icon: TagIcon },
        // { label: 'Tải xuống', icon: ArrowDownTrayIcon, hasMore: true },
        // { label: 'Đổi tên', icon: PencilIcon, isHighlighted: true },
        // { label: 'Chỉnh sửa', icon: PencilSquareIcon },
        { label: 'Xóa file', icon: TrashIcon, isDestructive: true },
    ];

    const handleItemClick = (label) => {
        if (label === 'Xóa file') {
            if (onDeleteClick) {
                onDeleteClick(menuState.file)
            }
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

            <ul>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleItemClick(item.label)}
                        className={`
                            flex items-center justify-between p-2 rounded-md cursor-pointer
                            ${item.isDestructive ? 'text-red-500 hover:bg-red-500/20' : 'hover:bg-gray-600/50'}
                            ${item.isHighlighted ? 'bg-gray-600/70' : ''}
                        `}
                    >
                        <div className="flex items-center space-x-3">
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </div>
                        {item.hasMore && <ChevronRightIcon className="h-4 w-4 text-gray-400" />}
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default ContextMenu