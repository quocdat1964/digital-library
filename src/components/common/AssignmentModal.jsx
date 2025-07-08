import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const AssignmentModal = ({ isOpen, onClose, onAssign, title, items = [], currentItemId }) => {
    const [selectedId, setSelectedId] = useState('')

    useEffect(() => {
        if (isOpen && currentItemId) {
            setSelectedId(currentItemId)
        } else {
            setSelectedId('')
        }
    }, [isOpen, currentItemId])

    if (!isOpen) return null

    const handleAssign = () => {
        if (selectedId) {
            onAssign(selectedId)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-md text-white">
                <div className='flex items-center justify-between p-4 border-b border-gray-700'>
                    <h3 className='text-lg font-semibold'>{title}</h3>
                    <button onClick={onClose} className='text-gray-400 hover:text-white'>
                        <XMarkIcon className='h-6 w-6' />
                    </button>
                </div>
                <div className='p-6'>
                    {items.length > 0 ? (
                        <div className='max-h-64 overflow-y-auto space-y-2 pr-2'>
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedId(item.id)}
                                    className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors border-2
                                        ${selectedId === item.id ? 'bg-red-900/50 border-red-500' : 'bg-gray-700 border-transparent hover:bg-gray-600'}
                                    `}
                                >
                                    <span>{item.name}</span>
                                    {selectedId === item.id && <CheckCircleIcon className='h-6 w-6 text-red-400' />}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-center text-gray-400'>Khong co muc nao de chon</p>
                    )}
                </div>
                <div className='flex justify-end p-4 bg-gray-800/50 border-t border-gray-700'>
                    <button
                        onClick={handleAssign}
                        disabled={!selectedId}
                        className='bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed'
                    >
                        Xac nhan
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AssignmentModal