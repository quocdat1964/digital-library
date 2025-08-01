import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, createUser, updateUserRole, deleteUser, setCurrentPage, setRoleFilter } from "../features/users/userSlice";
import { UserPlusIcon, ShieldCheck, TrashIcon, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import CreateUserModal from "../components/common/CreateUserModal";
import ConfirmationModal from '../components/common/ConfirmationModal'

const UserManagementPage = () => {
    const dispatch = useDispatch()
    const {
        filteredUserList,
        status,
        roleFilter,
        currentPage,
        usersPerPage,
    } = useSelector((state) => state.users)
    const { user: currentUser } = useSelector((state) => state.auth)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null });

    const [activeMenu, setActiveMenu] = useState(null)
    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (activeMenu && menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenu(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [activeMenu])

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const paginateUser = useMemo(() => {
        const indexOfLastUser = currentPage * usersPerPage
        const indexOfFirstUser = indexOfLastUser - usersPerPage
        return filteredUserList.slice(indexOfFirstUser, indexOfLastUser)
    }, [filteredUserList, currentPage, usersPerPage])

    const totalPages = Math.ceil(filteredUserList.length / usersPerPage)

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            dispatch(setCurrentPage(pageNumber))
        }
    }

    const handleCreateUser = (userData) => {
        dispatch(createUser(userData))
    }

    const handleRoleChange = (userId, newRole) => {
        dispatch(updateUserRole({ userId, newRole }));
        setActiveMenu(null);
    }

    const handleDeleteUser = (user) => {
        setDeleteModal({ isOpen: true, user })
        setActiveMenu(null);
    }

    const confirmDelete = () => {
        if (deleteModal.user) {
            console.log("Check delete user: ", deleteModal.user)
            dispatch(deleteUser(deleteModal.user.userId))
        }
        setDeleteModal({ isOpen: false, user: null })
    }

    const getRoleBadge = (role) => {
        switch (role) {
            case 'BOSS': return 'bg-yellow-500 text-black';
            case 'ADMIN': return 'bg-sky-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Quan li nguoi dung</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    <UserPlusIcon className="h-5 w-5 mr-2" />
                </button>
            </div>

            <div className="mb-4 flex justify-end">
                <select
                    value={roleFilter}
                    onChange={(e) => dispatch(setRoleFilter(e.target.value))}
                    className="bg-gray-700 text-white rounded-md px-3 py-2 border border-gray-600 focus:ring-red-500 focus:border-red-500"
                >
                    <option value="all">Tất cả vai trò</option>
                    <option value="ADMIN">Admin</option>
                    <option value="USER">User</option>
                </select>

            </div>

            <div className="bg-gray-800 rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tên</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vai trò</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Hành động</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {paginateUser.map((user) => (
                            <tr key={user.id}>
                                {/* Tên, avatar, email */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={user.avatarUrl} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-white">{user.name}</div>
                                            <div className="text-sm text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                {/* Vai trò */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>
                                {/* Hành động */}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {currentUser.role === 'BOSS' && user.role !== 'BOSS' && (
                                        <div className="relative inline-block text-left" ref={activeMenu === user.userId ? menuRef : null}>
                                            <button
                                                onClick={() => setActiveMenu(activeMenu === user.userId ? null : user.userId)}
                                                className="p-1 rounded-full hover:bg-gray-700"
                                            >
                                                <MoreVertical size={20} />
                                            </button>
                                            <div className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-10 transition-all duration-200
                                                ${activeMenu === user.userId ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`
                                            }>
                                                <div className="py-1" role="menu" aria-orientation="vertical">
                                                    {user.role === 'USER' && <a href="#" onClick={() => handleRoleChange(user.userId, 'ADMIN')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Đổi thành Admin</a>}
                                                    {user.role === 'ADMIN' && <a href="#" onClick={() => handleRoleChange(user.userId, 'USER')} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Đổi thành User</a>}
                                                    <a href="#" onClick={() => handleDeleteUser(user)} className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700">Xóa người dùng</a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {currentUser.role === 'ADMIN' && user.role === 'USER' && (
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="text-red-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-700"
                                        >
                                            <TrashIcon size={20} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-end space-x-5 mt-4 text-white">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="flex items-center px-3 py-1 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeft size={16} className="mr-1" />
                        Trước
                    </button>
                    <span>Trang {currentPage} / {totalPages}</span>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center px-3 py-1 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                        Sau
                        <ChevronRight size={16} className="ml-1" />
                    </button>
                </div>
            )}

            <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateUser}
            />
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, user: null })}
                onConfirm={confirmDelete}
                title='Xác nhận xóa người dùng'
            >
                <p>Bạn có chắc chắn muốn xóa người dùng <strong className="text-white">{deleteModal.user?.name}</strong> không?</p>
                <p className="mt-2 text-sm text-red-400">Hành động này không thể hoàn tác.</p>
            </ConfirmationModal>
        </div>
    )
}

export default UserManagementPage