import { XMarkIcon } from '@heroicons/react/24/solid'

import { useSelector } from 'react-redux'

const StagedFileCard = ({ stagedFile, onUpdate, onRemove, onToggleSelect, folderList = [] }) => {
    const { fileObject, previewUrl, name, description, author, folderId, isSelectedToSave } = stagedFile
    const { user: currentUser } = useSelector((state) => state.auth)
    return (
        <div className={`bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row gap-4 relative border-2 ${isSelectedToSave ? 'border-red-500/50' : 'border-transparent'}`}>
            <button onClick={onRemove} className='absolute top-2 right-2 text-gray-500 hover:text-white z-10'>
                <XMarkIcon className='h5 w-5' />
            </button>

            <div className="w-full md:w-1/3 flex-shrink-0 aspect-video bg-black rounded-md flex items-center justify-center overflow-hidden">
                {fileObject.type.startsWith('image/') ? (
                    <img src={previewUrl} alt="Preview" className='w-full h-full object-cover' />
                ) : (
                    <div className='text-center text-gray-400 p-2'>
                        <p className='font-bold text-lg'>{fileObject.type.split('/')[1]?.toUpperCase()}</p>
                        <p className='text-xs truncate'>{fileObject.name}</p>
                    </div>
                )}
            </div>

            <div className='flex-1 space-y-3'>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => onUpdate('name', e.target.value)}
                    placeholder='Ten file'
                    className='w-full bg-gray-700 text-white rounded-md px-3 py-2 text-sm'
                />
                <textarea
                    value={description}
                    onChange={(e) => onUpdate('description', e.target.value)}
                    placeholder='Mo ta(optional)'
                    rows={2}
                    className='w-full bg-gray-700 text-white rounded-md px-3 py-2 text-sm'
                ></textarea>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => onUpdate('author', e.target.value)}
                        placeholder='Tac gia(optional)'
                        className="w-full bg-gray-700 text-white rounded-md px-3 py-2 text-sm"
                    />
                    <select
                        value={folderId || ''}
                        onChange={(e) => onUpdate('folderId', e.target.value)}
                        onClick={()=>console.log("Check folder list: ", folderList)}
                        className="w-full bg-gray-700 text-white rounded-md px-3 py-2 text-sm"
                    >
                        <option value="" disabled>-- Chọn kho lưu trữ --</option>
                        {folderList.filter(folder => folder.ownerId === currentUser.userId).map(folder => (
                            <option key={folder.folderId} value={folder.folderId}>{folder.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="absolute bottom-2 right-2 flex items-center space-x-2 bg-gray-900/50 p-1 rounded-md">
                <label
                    htmlFor={`save-${stagedFile.fileId}`}
                    className="text-xs text-gray-300 cursor-pointer"
                >Lưu file này</label>
                <input
                    id={`save-${stagedFile.fileId}`}
                    type='checkbox'
                    checked={isSelectedToSave}
                    onChange={onToggleSelect}
                    className="h-4 w-4 rounded text-red-600 bg-gray-700 border-gray-600 focus:ring-red-500"
                />
            </div>
        </div>
    )
}

export default StagedFileCard