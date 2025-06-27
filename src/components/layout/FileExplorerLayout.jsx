import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileCard from '../common/FileCard';
import FileDetailPanel from '../common/FileDetailPanel';
import ContextMenu from '../common/ContextMenu';
import { useContextMenu } from '../../hooks/useContextMenu';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { closeFileDetailPanel } from '../../features/files/fileDetailSlice';

const FileExplorerLayout = ({ pageTitle, filesByDate, status, error }) => {
  const { isPanelOpen } = useSelector((state) => state.fileDetail);
  const { menuState, showContextMenu, closeContextMenu } = useContextMenu();
  const [openSections, setOpenSections] = useState({});
  const dispatch = useDispatch()

  useEffect(() => {

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
    <div className="space-y-4 bg-[#201F2B] px-4 rounded-md">
      <div className="sticky bg-[#201f2b] top-0 z-10 p-2 w-full">
        <h1 className="text-xl font-semibold text-yellow-500 w-full">{pageTitle}</h1>
      </div>

      <div className="flex flex-row items-start justify-between gap-4">
        <div className={`transition-all duration-300 ${isPanelOpen ? 'w-full xl:w-[65%]' : 'w-full'}`}>
          {sortedDates.map((dateKey) => (
            <div key={dateKey} className="mb-6">
              <div className="flex items-center space-x-3 cursor-pointer mb-4" onClick={() => toggleSection(dateKey)}>
                {openSections[dateKey] ? <ChevronDownIcon className="h-6 w-6 text-gray-300" /> : <ChevronRightIcon className="h-6 w-6 text-gray-300" />}
                <h2 className="text-lg font-semibold text-gray-200">Ngày {dateKey}</h2>
                <span className="text-sm text-yellow-500">{filesByDate[dateKey].length} file</span>
              </div>
              {openSections[dateKey] && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filesByDate[dateKey].map((file) => (
                    <FileCard key={file.id} file={file} onContextMenu={showContextMenu} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cột phải chỉ hiện khi có file được chọn, và dính lại khi cuộn */}
        <div className={`
          hidden xl:block flex-shrink-0 sticky top-16
          transition-all duration-300 ease-in-out
          ${isPanelOpen ? 'w-[35%] opacity-100' : 'w-0 opacity-0'}
        `}>
          {/* <div className="h-32"> 
            <FileDetailPanel />
          </div> */}
          <FileDetailPanel />
        </div>
      </div>

      <div className="xl:hidden">
        {/* Lớp phủ nền */}
        <div
          className={`fixed inset-0 top-16 bg-black/60 z-40 transition-opacity duration-300
            ${isPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => dispatch(closeFileDetailPanel())}
        ></div>
        {/* Panel chính */}
        <div className={`
          fixed top-16 right-0 h-[100vh] w-full sm:w-[70%] md:w-[60%] lg:w-[50%] z-50
          transition-transform duration-300 ease-in-out
          ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <FileDetailPanel />
        </div>
      </div>

      <ContextMenu menuState={menuState} closeMenu={closeContextMenu} />
    </div>
  );
};

export default FileExplorerLayout;
