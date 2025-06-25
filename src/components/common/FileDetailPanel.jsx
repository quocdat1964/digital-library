import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeFileDetailPanel, updateFileDetails } from "../../features/files/fileDetailSlice";
import { XMarkIcon, ArrowDownTrayIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

const FilePreviewer = ({ file }) => {
    if (!file || !file.contentUrl) {
        return <div className="flex items-center justify-center h-full bg-gray-900 text-white">Không có nội dung xem trước</div>
    }

    switch (file.type.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return <img src={file.contentUrl} alt={file.name} className="w-full h-full object-contain" />
        case 'pdf':
            return <iframe src={file.contentUrl} title={file.name} className="w-full h-full border-0" />
        case 'mp4':
            return <video src={file.contentUrl} controls className="w-full h-full bg-black"></video>
        default:
            return <div className="flex items-center justify-center h-full bg-gray-900 text-white">Xem trước không được hỗ trợ cho loại file này</div>;
    }
}

const EditableInfoRow = ({ label, value, onChange }) => {
    const [isEditing, setIsEditing] = useState(false)

    if (isEditing) {
        return (
            <div className="grid grid-cols-3 gap-4 items-center">
                <dt className="text-sm font-medium text-gray-400">{label}</dt>
                <dd className="col-span-2 mt-1 text-sm text-gray-200">
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        onBlur={() => setIsEditing(false)}
                        onKeyDown={(e) => { if (e.key === 'Enter') setIsEditing(false) }}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
                        autoFocus
                    />
                </dd>
            </div>
        )
    }

    return (
        <div
            className="grid grid-cols-3 gap-4 items-center group cursor-pointer"
            onClick={() => setIsEditing(true)}
        >
            <dt className="text-sm font-medium text-gray-400">{label}</dt>
            <dd className="col-span-2 mt-1 text-sm text-gray-200 flex justify-between items-center">
                <span>{value || <i className="text-gray-500">No information</i>}</span>
                <PencilSquareIcon className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </dd>
        </div>
    )
}

const FileDetailPanel = () => {
    const dispatch = useDispatch()
    const { isPanelOpen, selectedFile, status } = useSelector((state) => state.fileDetail)
    const [formData, setFormData] = useState({})

    useEffect(() => {
        if (selectedFile) {
            setFormData({
                title: selectedFile.title || '',
                description: selectedFile.description || '',
                author: selectedFile.author || '',
            });
        }
    }, [selectedFile])

    const handleClose = () => {
        dispatch(closeFileDetailPanel())
    }

    const handleInputChange = (e, field) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }))
    }

    const handleSaveChanges = () => {
        dispatch(updateFileDetails({ ...selectedFile, ...formData }))
    }

    const isLoading = status === 'loading'
    const isUpdating = status === 'updating'

    return (
        <div
            className={`fixed top-0 right-0 h-full w-full lg:w-3/5 bg-[#2d2c35] shadow-2xl transition-transform duration-300 ease-in-out z-50 flex flex-col
                        ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}
                        `}
        >
            {/* Header của Panel */}
            <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                <h2 className="text-lg font-semibold text-white truncate">
                    {isLoading ? 'Đang tải...' : selectedFile?.name || ''}
                </h2>
                <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 rounded-md hover:bg-green-700">
                        <ArrowDownTrayIcon className="h-5 w-5" />
                        <span>Tải xuống</span>
                    </button>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {/* Nội dung Panel */}
            <div className="flex-grow overflow-hidden flex flex-col">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full text-white">Đang tải chi tiết file...</div>
                ) : selectedFile ? (
                    <>
                        {/* Vùng xem trước file */}
                        <div className="flex-1 bg-black overflow-auto">
                            <FilePreviewer file={selectedFile} />
                        </div>

                        {/* Vùng thông tin file */}
                        <div className="p-6 overflow-y-auto h-1/3 flex-shrink-0 text-white">
                            <dl className="space-y-4">
                                <EditableInfoRow label="Tiêu đề" value={formData.title} onChange={(e) => handleInputChange(e, 'title')} />
                                <EditableInfoRow label="Mô tả" value={formData.description} onChange={(e) => handleInputChange(e, 'description')} />
                                <EditableInfoRow label="Tác giả" value={formData.author} onChange={(e) => handleInputChange(e, 'author')} />

                                {/* Thông tin không chỉnh sửa */}
                                <div className="grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-400">Ngày</dt><dd className="col-span-2 mt-1 text-sm text-gray-200">{new Date(selectedFile.createdAt).toLocaleString('vi-VN')}</dd></div>
                                <div className="grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-400">Người tải lên</dt><dd className="col-span-2 mt-1 text-sm text-gray-200">{selectedFile.uploader}</dd></div>
                                <div className="grid grid-cols-3 gap-4"><dt className="text-sm font-medium text-gray-400">Số lượt tải</dt><dd className="col-span-2 mt-1 text-sm text-gray-200">{selectedFile.downloadCount}</dd></div>
                            </dl>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handleSaveChanges}
                                    className="px-6 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-500"
                                    disabled={isUpdating}
                                >
                                    {isUpdating ? 'Đang lưu...' : 'Lưu thay đổi'}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-red-500">Không thể tải thông tin file.</div>
                )}
            </div>
        </div>
    )
}

export default FileDetailPanel