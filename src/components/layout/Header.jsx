import { useDispatch } from "react-redux";
import { Menu, Plus, Search } from "lucide-react";
import { toggleSidebar } from "../../features/ui/uiSlice";
import SearchBar from "../common/SearchBar";
import UserMenu from "../../features/auth/UserMenu";
import { useEffect, useState } from "react";

const Header = () => {
    const dispatch = useDispatch()

    const handleToggleSidebar = () => {
        dispatch(toggleSidebar())
    }

    const [showSearchbar, setShowSearchbar] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280 && showSearchbar) {
                setShowSearchbar(false)
            }
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [showSearchbar])

    return (
        <header className=" bg-[#201f2b] text-white p-3 flex justify-between items-center shadow-md">

            {/* Hamburger & Logo */}
            <div className="flex items-center gap-2">
                <button onClick={handleToggleSidebar} className="p-2 rounded-md hover:bg-gray-700">
                    <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold tracking-wider max-sm:text-sm">THƯ VIỆN SỐ</h1>
                <button className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-2 rounded-lg transition-colors 
                                    max-sm:text-sm">
                    <Plus className="h-5 w-5 mr-2" />
                    Upload
                </button>
            </div>

            {/* Search Bar */}
            <div className="hidden xl:flex flex-grow justify-center px-8">
                <SearchBar />
            </div>

            {/* Nút Upload và User Menu */}
            <div className="flex items-center space-x-4">
                <Search
                    className="flex xl:hidden cursor-pointer"
                    onClick={() => setShowSearchbar(!showSearchbar)}
                />

                <UserMenu />
            </div>
            {/* Ẩn/Hiện search bar khi ở màn hình nhỏ */}
            <div
                className={`fixed top-20 right-0 bg-[#282733] flex flex-grow justify-center p-4 rounded-lg border border-gray-600 transition-all duration-200 ease-in-out transform 
                    ${showSearchbar
                        ? 'opacity-100 scale-100 z-20 pointer-events-auto'
                        : 'opacity-0 scale-95 z-20 pointer-events-none'
                    }`}
            >
                <SearchBar />
            </div>
        </header>
    );
}

export default Header