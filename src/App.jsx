import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleSidebar } from "./features/ui/uiSlice";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import FileDetailPanel from "./components/common/FileDetailPanel";
import AppRoutes from "./routes";

const App = () => {

    const dispatch = useDispatch()
    const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1280)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className="flex flex-col h-screen">
            <Header />
            {/* Phần hiển thị sidebar tùy kích thước màn hình */}
            <div className="flex flex-grow relative">
                {isDesktop ? (
                    <div className={`transition-all duration-500 ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden flex-shrink-0 bg-gray-800`}>
                        <Sidebar />
                    </div>
                ) : (
                    <>
                        <div className={`fixed inset-0 bg-black transition-opacity duration-300
                                        ${isSidebarOpen ? 'opacity-40' : 'opacity-0 pointer-events-none'}`}
                            onClick={() => dispatch(toggleSidebar())}
                        ></div>
                        <div className={`absolute top-0 left-0 h-full w-64 bg-gray-800
                                        transition-transform duration-300 ease-in-out
                                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                            <Sidebar />
                        </div>
                    </>
                )}
                {/* Nội dung chính */}
                <main className="flex-grow bg-[#393844] text-white overflow-y-auto">
                    <div className="p-4 sm:p-6">
                        <AppRoutes />
                    </div>
                </main>
            </div>
            <FileDetailPanel />
        </div>
    )
}

export default App;