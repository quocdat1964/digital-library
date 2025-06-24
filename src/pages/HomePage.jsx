import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFiles } from "../features/files/fileSlice";
import FileCard from "../components/common/FileCard";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

const parseDateString = (dateStr) => {
    const [day, month, year] = dateStr.split('/')
    return new Date(year, month - 1, day)
}

const HomePage = () => {
    const dispatch = useDispatch();
    const { filesByDate, status, error } = useSelector((state) => state.files)

    const [openSection, setOpenSection] = useState({})

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchFiles())
            console.log("Check var: ", filesByDate)
        }
    }, [status, dispatch])

    useEffect(() => {
        if (status === 'succeeded') {
            const initialOpenState = Object.keys(filesByDate).reduce((acc, dateKey) => {
                acc[dateKey] = true
                return acc
            }, {})
            setOpenSection(initialOpenState)
        }
    }, [status, filesByDate])

    const toggleSection = (dateKey) => {
        setOpenSection(prev => ({ ...prev, [dateKey]: !prev[dateKey] }))
    }

    const sortedDates = Object.keys(filesByDate).sort((a, b) => {
      const dateA = parseDateString(a);
      const dateB = parseDateString(b);
      return dateB - dateA; // So sánh timestamp để sắp xếp
  });

    if (status === 'loading') {
        return <div className="text-center text-xl text-gray-400">Đang tải dữ liệu...</div>;
    }

    if (status === 'failed') {
        return <div className="text-center text-xl text-red-500">Lỗi: {error}</div>;
    }

    return (
        <div className="space-y-6 bg-gray-900 px-4 py-2 rounded-md">
            <h1 className="text-2xl font-bold text-white">Trang chủ</h1>
            {sortedDates.map((dateKey) => (
                <div key={dateKey}>
                    <div
                        className="flex items-center space-x-3 cursor-pointer mb-4"
                        onClick={() => toggleSection(dateKey)}
                    >
                        {openSection[dateKey] ? (
                            <ChevronDownIcon className="h-6 w-6 text-gray-300" />
                        ) : (
                            <ChevronRightIcon className="h-6 w-6 text-gray-300" />
                        )}
                        <h2 className="text-lg font-semibold text-gray-200">
                            Ngày {dateKey.replace(/\//g, '/')}
                        </h2>
                        <span className="text-sm text-yellow-500">
                            {filesByDate[dateKey].length} file
                        </span>
                    </div>
                    {openSection[dateKey] && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {filesByDate[dateKey].map((file) => (
                                <FileCard key={file.id} file={file} />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default HomePage;