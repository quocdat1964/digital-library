import { useState } from "react";
import { XMarkIcon, UserPlusIcon } from '@heroicons/react/24/outline'

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'user',
    })

    if (!isOpen) return null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleCreate = () => {
        if (formData.email.trim() && formData.password.trim() && formData.name.trim()) {
            onCreate(formData)
            onClose()
        } else {
            alert('hay dien du thong tin')
        }
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-lg text-white">
                {/* Nút tạo tk và nút đóng */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold">Tao tai khoan moi</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                {/* Phần thông tin tài khoản */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Ho va ten</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Mật khẩu</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500" />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">Vai trò</label>
                        <select name="role" id="role" value={formData.role} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                {/* Nút xác nhận */}
                <div className="flex justify-end p-4 bg-gray-800/50 border-t border-gray-700">
                    <button onClick={handleCreate} className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 disabled:bg-gray-500">
                        <UserPlusIcon className="h-5 w-5 inline-block mr-2" />
                        Tạo tài khoản
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateUserModal