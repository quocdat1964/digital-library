import { FolderIcon, GlobeAltIcon, LockClosedIcon } from "@heroicons/react/24/solid";

const FolderCard = ({ folder, onClick, onContextMenu, showPrivacy = true }) => {
    return (
        <div
            onClick={onClick}
            onContextMenu={(e) => onContextMenu(e, folder)}
            className="bg-gray-700/50 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-700 transition-colors group"
        >
            <div className="relative mb-2">
                <FolderIcon className="w-20 h-20 text-gray-400 group-hover:text-red-400" />
                {folder.isPublic && showPrivacy && (
                    <div className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-1 border-2 border-gray-700/50">
                        <GlobeAltIcon className="w-4 h-4 text-sky-400" />
                    </div>
                )}
                {!folder.isPublic && showPrivacy && (
                    <div className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-1 border-2 border-gray-700/50">
                        <LockClosedIcon className="w-4 h-4 text-yellow-400" />
                    </div>
                )}
            </div>
            <p className="text-sm font-medium text-white truncate w-full">{folder.name}</p>
        </div>
    )
}

export default FolderCard