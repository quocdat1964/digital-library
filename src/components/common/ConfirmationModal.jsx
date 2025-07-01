import { XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, children }) => {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex items-start justify-between p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                        </div>
                        <h3 className="text-lg font-semibold leading-6 text-white" id="modal-title">
                            {title}
                        </h3>
                    </div>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-white"
                        onClick={onClose}
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6 text-gray-300">
                    {children}
                </div>
                <div className="flex flex-row-reverse gap-3 bg-gray-800/50 px-4 py-3 sm:px-6 rounded-b-lg">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto"
                        onClick={onConfirm}
                    >
                        Xác nhận Xóa
                    </button>
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 sm:mt-0 sm:w-auto"
                        onClick={onClose}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal