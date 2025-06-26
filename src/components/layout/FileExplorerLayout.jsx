import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileCard from '../common/FileCard';
import FileDetailPanel from '../common/FileDetailPanel';
import ContextMenu from '../common/ContextMenu';
import { useContextMenu } from '../../hooks/useContextMenu';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

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
    <div className="space-y-6 bg-[#201F2B] p-2">
      {/* <h1 className="text-2xl font-bold text-white">{pageTitle}</h1> */}
      <div className="sticky top-0 z-10 bg-[#393844] py-4 -mt-6 -mx-6 px-6 mb-6">
        <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
      </div>

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
        <div className={`
          hidden xl:block flex-shrink-0 sticky top-24
          transition-all duration-300 ease-in-out overflow-hidden
          ${isPanelOpen ? 'w-2/5 opacity-100' : 'w-0 opacity-0'}
        `}>
          {/* Inner div này để nội dung panel không bị bóp méo khi animation */}
          <div className="w-[33vw]"> {/* Dùng đơn vị viewport để chiều rộng ổn định */}
            <FileDetailPanel />
          </div>
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
          fixed top-16 right-0 h-[calc(100%-4rem)] w-full sm:w-4/5 md:w-3/5 z-50
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


// import React, { useEffect, useState } from 'react';
// import FileCard from '../common/FileCard';
// import ContextMenu from '../common/ContextMenu';
// import { useContextMenu } from '../../hooks/useContextMenu';
// import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// const FileExplorerLayout = ({ pageTitle, filesByDate, status, error }) => {
//   // Đã loại bỏ tất cả logic liên quan đến isPanelOpen
//   const { menuState, showContextMenu, closeContextMenu } = useContextMenu();
//   const [openSections, setOpenSections] = useState({});

//   useEffect(() => {
//     if (filesByDate) {
//       const initialOpenState = Object.keys(filesByDate).reduce((acc, dateKey) => {
//         acc[dateKey] = true;
//         return acc;
//       }, {});
//       setOpenSections(initialOpenState);
//     }
//   }, [filesByDate]);

//   const toggleSection = (dateKey) => {
//     setOpenSections(prev => ({ ...prev, [dateKey]: !prev[dateKey] }));
//   };

//   const parseDateString = (dateStr) => {
//     const [day, month, year] = dateStr.split('/');
//     return new Date(year, month - 1, day);
//   };

//   const sortedDates = Object.keys(filesByDate).sort((a, b) => {
//     return parseDateString(b) - parseDateString(a);
//   });

//   if (status === 'loading') return <div className="text-center text-xl text-gray-400">Đang tải dữ liệu...</div>;
//   if (status === 'failed') return <div className="text-center text-xl text-red-500">Lỗi: {error}</div>;

//   return (
//     <div className="space-y-6">
//       <div className="sticky top-0 z-10 bg-[#393844] py-4 -mt-6 -mx-6 px-6 mb-6">
//         <h1 className="text-2xl font-bold text-white">{pageTitle}</h1>
//       </div>

//       {/* Bỏ container flex, cột danh sách giờ luôn chiếm toàn bộ chiều rộng */}
//       <div>
//         {sortedDates.map((dateKey) => (
//           <div key={dateKey} className="mb-6">
//             <div className="flex items-center space-x-3 cursor-pointer mb-4" onClick={() => toggleSection(dateKey)}>
//               {openSections[dateKey] ? <ChevronDownIcon className="h-6 w-6 text-gray-300" /> : <ChevronRightIcon className="h-6 w-6 text-gray-300" />}
//               <h2 className="text-lg font-semibold text-gray-200">Ngày {dateKey}</h2>
//               <span className="text-sm text-yellow-500">{filesByDate[dateKey].length} file</span>
//             </div>
//             {openSections[dateKey] && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
//                 {filesByDate[dateKey].map((file) => (
//                   <FileCard key={file.id} file={file} onContextMenu={showContextMenu} />
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
      
//       {/* Không còn render FileDetailPanel ở đây nữa */}
//       <ContextMenu menuState={menuState} closeMenu={closeContextMenu} />
//     </div>
//   );
// };

// export default FileExplorerLayout;
