import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const fileTypes = ['All', 'Image', 'Video', 'PDF', 'Word', 'Excel', 'HTML']
    const [activeType, setActiveType] = useState('All')

    return (
        <div className="flex flex-col items-center">
            {/* Thanh tìm kiếm */}
            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên file, người đăng, tag..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white text-black placeholder-gray-400 rounded-full text-md py-1.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
            </div>
            {/* Các nút lọc */}
            <div className="flex items-center gap-3 mt-3 max-xl:grid max-xl:grid-cols-4 max-md:grid-cols-3">
                {fileTypes.map((type) => (
                    <button 
                        key={type}
                        onClick={() => setActiveType(type)}
                        className={`px-4 py-0.5 text-md rounded-full border border-gray-200 font-medium transition-colors ${activeType === type
                            ? 'bg-gray-700 text-white'
                            : 'bg-[#201f2b] text-gray-300 hover:bg-gray-600'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );
}



export default SearchBar;