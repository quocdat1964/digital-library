import React from 'react';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';

const BulkActionBar = ({ selectedCount, onClear, onDelete }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white rounded-lg shadow-2xl flex items-center space-x-6 px-6 py-3 z-30">
      <p className="font-semibold">{selectedCount} mục đã được chọn</p>
      <div className="h-6 w-px bg-gray-600"></div>
      <button 
        onClick={onDelete}
        className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
      >
        <TrashIcon className="h-5 w-5" />
        <span>Xóa</span>
      </button>
      <button 
        onClick={onClear}
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
      >
        <XMarkIcon className="h-5 w-5" />
        <span>Bỏ chọn</span>
      </button>
    </div>
  );
};

export default BulkActionBar;
