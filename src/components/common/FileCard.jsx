import { useDispatch, useSelector } from "react-redux";
import { fetchFileDetails } from "../../features/files/fileDetailSlice";

const FileCard = ({ file, onContextMenu, isSelected }) => {
    const dispatch = useDispatch()

    const getFileTypeColor = (type) => {
        switch (type.toLowerCase()) {
            case 'pdf': return 'bg-red-500';
            case 'jpg':
            case 'jpeg':
            case 'png': return 'bg-yellow-500';
            case 'word': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    }

    const handleCardClick = (e) => {
        e.stopPropagation()
        dispatch(fetchFileDetails(file.id))
    }

    return (
        // <div className="bg-[#2d2c35] rounded-lg overflow-hidden shadow-lg cursor-pointer group"
        <div className={`
                bg-[#2d2c35] rounded-lg overflow-hidden shadow-lg cursor-pointer group
                transition-all duration-200
                ${isSelected ? 'ring-2 ring-red-500' : 'ring-2 ring-transparent'}
            `}
            onClick={handleCardClick}
            onContextMenu={(e) => onContextMenu(e, file)}
        >
            <div className="relative aspect-square">
                <img
                    src={file.thumbnailUrl}
                    alt={file.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-1 text-xs text-white rounded-md" style={{ backgroundColor: getFileTypeColor(file.type) }}>
                    {file.type.toUpperCase()}
                </div>
                <div className="absolute top-2 left-2">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 rounded-sm border-gray-300 focus:ring-indigo-500" />
                </div>
            </div>
            <div className="p-3">
                <p className="text-white text-sm truncate group-hover:underline">{file.name}</p>
            </div>
        </div>
    )
}

export default FileCard