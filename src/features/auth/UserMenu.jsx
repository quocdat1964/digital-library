import { useSelector, useDispatch } from "react-redux";
import { LogOut, User } from "lucide-react";
import { logout } from "./authSlice";

const UserMenu = () => {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    if (!user) {
        return null //Navigate to homepage
    }

    return (
        <div className="flex items-center space-x-4">
            <div className="text-right hidden md:flex md:flex-col">
                <p className="text-md text-gray-400">Xin chào</p>
                <p className="text-md font-semibold text-white">{user.name}</p>
            </div>
            <div className="relative group">
                <img
                    src={user.avatarUrl}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-600"
                />
                {/* Dropdown menu khi hover */}
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <a href="#profile" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                        <User className="w-4 h-4 mr-2" />
                        Hồ sơ
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserMenu