
const Sidebar = () => {
    return (
        <aside className="w-64 bg-[#282733] h-full text-white p-4 transition-all duration-300">
            <h2 className="font-bold mb-4">Resource</h2>
            <ul>
                <li className="mb-2 p-2 rounded-md hover:bg-gray-700 cursor-pointer">Homepage</li>
                <li className="mb-2 p-2 rounded-md hover:bg-gray-700 cursor-pointer">Storage</li>
            </ul>
        </aside>
    )
}
export default Sidebar