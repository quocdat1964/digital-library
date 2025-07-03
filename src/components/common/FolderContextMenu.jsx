import { useEffect, useRef } from "react";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const FolderContextMenu = ({ menuState, closeMenu, onEditClick, onDeleteClick }) => {
    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                closeMenu()
            }
        }
        if (menuState.show) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [menuState.show, closeMenu])

    if (!menuState.show) return null

    const folder = menuState.file

    if (!folder) return null

    return (
        <div
            ref={menuRef}
            className="fixed z-50 w-48 bg-[#2d2c35] rounded-lg shadow-lg p-2 text-white text-sm"
            style={{ top: menuState.y, left: menuState.x }}
        >
            <ul>
                <li
                    onClick={() => { onEditClick(folder); closeMenu(); }}
                    className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-600/50"
                >
                    <PencilSquareIcon className="h-5 w-5 mr-3" />
                    <span>Chỉnh sửa</span>
                </li>
                <li
                    onClick={() => { onDeleteClick(folder); closeMenu() }}
                    className="flex items-center p-2 rounded-md cursor-pointer text-red-400 hover:bg-red-500/20"
                >
                    <TrashIcon className="h-5 w-5 mr-3" />
                    <span>Xóa</span>
                </li>
            </ul>
        </div>
    )
}

export default FolderContextMenu