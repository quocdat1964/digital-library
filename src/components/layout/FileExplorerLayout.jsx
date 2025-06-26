import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FileCard from '../common/FileCard';
import FileDetailPanel from '../common/FileDetailPanel';
import ContextMenu from '../common/ContextMenu';
import { useContextMenu } from '../../hooks/useContextMenu';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// Component layout này có thể được dùng ở bất cứ đâu
const FileExplorerLayout = ({ pageTitle, filesByDate, status, error }) => {
  const { isPanelOpen } = useSelector((state) => state.fileDetail);
  const { menuState, showContextMenu, closeContextMenu } = useContextMenu();
  const [openSections, setOpenSections] = useState({});

  // Logic này giờ nằm trong layout, tự quản lý section của riêng nó
  useState(() => {
    if (filesByDate) {
      const initialOpenState = Object.keys(filesByDate).reduce((acc, dateKey) => {
        acc[dateKey] = true;
        return acc;
      }, {});
      setOpenSections(initialOpenState);
    }
  }, [filesByDate]);

  const toggleSection = (dateKey) => {
    setOpenSections(prev => ({ ...prev, [dateKey]: !prev[dateKey] }));
  };
  
  const parseDateString = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return new Date(year, month - 1, day);
  };
  
  const sortedDates = Object.keys(filesByDate).sort((a, b) => {
    const dateA = parseDateString(a);
    const dateB = parseDateString(b);
    return dateB - dateA;
  });

  if (status === 'loading') {
    return <div className="text-center text-xl text-gray-400">Đang tải dữ liệu...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-xl text-red-500">Lỗi: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
      
      <div className="flex flex-row items-start gap-6">
        <div className={`transition-all duration-300 ${isPanelOpen ? 'w-full xl:w-3/5' : 'w-full'}`}>
          {sortedDates.map((dateKey) => (
            <div key={dateKey} className="mb-6">
              <div className="flex items-center space-x-3 cursor-pointer mb-4" onClick={() => toggleSection(dateKey)}>
                {openSections[dateKey] ? <ChevronDownIcon className="h-6 w-6 text-gray-300" /> : <ChevronRightIcon className="h-6 w-6 text-gray-300" />}
                <h2 className="text-lg font-semibold text-gray-200">Ngày {dateKey}</h2>
                <span className="text-sm text-yellow-500">{filesByDate[dateKey].length} file</span>
              </div>
              {openSections[dateKey] && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                  {filesByDate[dateKey].map((file) => (
                    <FileCard key={file.id} file={file} onContextMenu={showContextMenu} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cột phải chỉ hiện khi có file được chọn, và dính lại khi cuộn */}
        {isPanelOpen && (
          <div className="hidden xl:block w-2/5 flex-shrink-0 sticky top-4">
            <FileDetailPanel />
          </div>
        )}
      </div>

      <ContextMenu menuState={menuState} closeMenu={closeContextMenu} />
    </div>
  );
};

export default FileExplorerLayout;
