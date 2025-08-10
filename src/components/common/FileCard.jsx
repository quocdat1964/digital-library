import { useDispatch, useSelector } from "react-redux";
import { fetchFileDetails } from "../../features/files/fileDetailSlice";
import { toggleFileSelection } from "../../features/files/fileSlice";

const FileCard = ({ file, onContextMenu, isSelected, isTicked, isOwner }) => {
    const dispatch = useDispatch()

    const getFileTypeColor = (fileType) => {
        if (!fileType) return '#6B7280'; // Default gray-500 hex
        const typeLower = fileType.toLowerCase();

        if (typeLower.includes('pdf')) return '#DC3545'; // Red for PDF (Tailwind red-600 approx)
        if (typeLower.includes('image/')) return '#3B82F6'; // Blue for images (Tailwind blue-500 approx)
        if (typeLower.includes('word') || typeLower.includes('application/msword') || typeLower.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) return '#2563EB'; // Darker blue for Word (Tailwind blue-700 approx)
        if (typeLower.includes('excel') || typeLower.includes('application/vnd.ms-excel') || typeLower.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) return '#10B981'; // Green for Excel (Tailwind green-500 approx)
        if (typeLower.includes('powerpoint') || typeLower.includes('application/vnd.ms-powerpoint') || typeLower.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation')) return '#F59E0B'; // Orange for PowerPoint (Tailwind yellow-500 approx)
        if (typeLower.includes('text/plain')) return '#4B5563'; // Darker gray for Text (Tailwind gray-700 approx)
        if (typeLower.includes('video/')) return '#8B5CF6'; // Purple for Video (Tailwind purple-500 approx)
        if (typeLower.includes('audio/')) return '#FBBF24'; // Amber for Audio (Tailwind amber-400 approx)

        return '#6B7280'; // Default gray-500
    };

    const handleCardClick = (e) => {
        e.stopPropagation()
        dispatch(fetchFileDetails(file.fileId))
    }

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        dispatch(toggleFileSelection(file.fileId))
    }

    return (
        // <div className="bg-[#2d2c35] rounded-lg overflow-hidden shadow-lg cursor-pointer group"
        <div className={`
                bg-[#2d2c35] rounded-lg overflow-hidden shadow-lg cursor-pointer group
                transition-all duration-200
                ${isTicked ? 'ring-2 ring-red-500' : 'ring-2 ring-transparent'}
            `}
            onClick={handleCardClick}
            onContextMenu={(e) => onContextMenu(e, file)}
        >
            <div className="relative aspect-square">
                <img
                    src={file.thumbnailUrl}
                    alt={file.fileName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-1 text-xs text-white rounded-sm" style={{ backgroundColor: getFileTypeColor(file.fileType) }}>
                    {file.fileType.toUpperCase()}
                </div>
                {isOwner && (
                    <div className="absolute top-2 left-2" onClick={(e) => e.stopPropagation()}>
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-indigo-600 rounded-sm border-gray-300 focus:ring-indigo-500"
                            onChange={handleCheckboxChange}
                            checked={isSelected}
                        />
                    </div>
                )}

            </div>
            <div className="p-3">
                <p className="text-white text-sm truncate group-hover:underline">{file.title}</p>
            </div>
        </div>
    )
}

export default FileCard