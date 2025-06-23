import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../features/ui/uiSlice";
import Header from '../components/layout/Header'
import Sidebar from "../components/layout/Sidebar";

const HomePage = () => {
    const dispatch = useDispatch()
    const isSidebarOpen = useSelector((state) => state.ui.isSidebarOpen)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1280)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })

    return (
        <div className="flex flex-col h-screen bg-gray-900">
            <Header />
            <div className="flex flex-grow overflow-hidden">
                {isDesktop ? (
                    <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
                        <Sidebar />
                    </div>
                ) : (
                    isSidebarOpen && (
                        <div className="fixed inset-10 z-40 flex">
                            <div
                                className="fixed inset-0 bg-black/50"
                                onClick={() => dispatch(toggleSidebar())}
                            ></div>

                            <div className="relative w-64 bg-gray-800 z-50 p-4 transition-transform transform translate-x-0">
                                <Sidebar />
                            </div>
                        </div>

                    )
                )}
                {/* Nội dung chính */}
                <main className="flex-grow p-6 text-white">
                    <h1 className="text-2xl font-bold">Nội dung chính</h1>
                    <p>Đây là nơi hiển thị danh sách các file của bạn.</p>
                </main>
            </div>
        </div>
    )
}

export default HomePage;