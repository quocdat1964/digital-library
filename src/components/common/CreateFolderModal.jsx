import { useState } from "react";
import {
    XMarkIcon,
    FolderPlusIcon,
    GlobeAltIcon,
    LockClosedIcon
} from "@heroicons/react/24/outline";

const CreateFolderModal = ({ isOpen, onClose, onCreate, showPrivacyOptions = true }) => {
    const [name, setName] = useState('')
    const [isPublic, setIsPublic] = useState(true)

    if (!isOpen) return null

    const handleCreate = () => {
        if (name.trim()) {
            onCreate(showPrivacyOptions ? { name, isPublic } : { name });
            onClose()
            setName('')
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-md text-white">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold">Tạo thư mục mới</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label htmlFor="folder-name" className="block text-sm font-medium text-gray-300 mb-1">Tên thư mục</label>
                        <input
                            type="text"
                            id="folder-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ví dụ: Tài liệu Marketing Q3"
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                    {showPrivacyOptions && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Chế độ hiển thị</label>
                            <div className="flex items-center space-x-4">
                                <button onClick={() => setIsPublic(true)} className={`flex-1 p-3 rounded-md border-2 ${isPublic ? 'border-red-500 bg-red-900/50' : 'border-gray-600 bg-gray-700 hover:bg-gray-600'}`}>
                                    <GlobeAltIcon className="h-6 w-6 mx-auto mb-1" />
                                    <span className="text-sm">Công khai</span>
                                </button>
                                <button onClick={() => setIsPublic(false)} className={`flex-1 p-3 rounded-md border-2 ${!isPublic ? 'border-red-500 bg-red-900/50' : 'border-gray-600 bg-gray-700 hover:bg-gray-600'}`}>
                                    <LockClosedIcon className="h-6 w-6 mx-auto mb-1" />
                                    <span className="text-sm">Riêng tư</span>
                                </button>
                            </div>
                        </div>
                    )}

                </div>
                <div className="flex justify-end p-4 bg-gray-800/50 border-t border-gray-700">
                    <button onClick={handleCreate} disabled={!name.trim()} className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed">
                        <FolderPlusIcon className="h-5 w-5 inline-block mr-2" />
                        Tạo
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateFolderModal