import { useState } from "react";
import { XMarkIcon, UserPlusIcon } from '@heroicons/react/24/outline'

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        role: 'USER',
    })

    const [errors, setErrors] = useState({})

    if (!isOpen) return null

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null })
        }
    }

    const validate = () => {
        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = 'Tên không được để trống'
        if (!formData.email.trim()) {
            newErrors.email = 'Email không được để trống'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Định dạng email không hợp lệ'
        }
        if (!formData.password) {
            newErrors.password = "Mật khẩu không được để trống.";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
        }
        return newErrors;
    }

    const handleCreate = () => {
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        onCreate(formData)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="relative bg-gray-800 rounded-lg shadow-xl w-full max-w-lg text-white">
                {/* Nút tạo tk và nút đóng */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold">Tạo tài khoản mới</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                {/* Phần thông tin tài khoản */}
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Tên người dùng</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500" />
                            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500" />
                            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Mật khẩu</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500" />
                        {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">Vai trò</label>
                        <select name="role" id="role" value={formData.role} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500">
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
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