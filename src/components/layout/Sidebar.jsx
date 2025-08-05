import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Home, Archive, Library, UploadCloud, Users } from "lucide-react"
import { fetchFiles } from "../../features/files/fileSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const isAdminOrBoss = user && (user.role === 'ADMIN' || user.role === 'BOSS')

    const navLinks = [
        { to: '/', label: 'Home Page', icon: Home },
        { to: '/archive', label: 'Archive', icon: Archive },
        { to: '/collections', label: 'Collection', icon: Library },
        { to: '/upload', label: 'Upload', icon: UploadCloud },
        isAdminOrBoss && {to: '/users', label: 'Account', icon: Users}
    ].filter(Boolean)

    const getLinkClass = ({ isActive }) => {
        return `flex items-center p-3 rounded-lg transition-colors text-md font-medium
        ${isActive
                ? 'bg-red-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }
        `
    }

    const handleDispatch = (name) => {
        if(name === 'Home Page'){
            dispatch(fetchFiles())
        }
    }
    return (
        <aside className="w-64 bg-[#282733] h-full text-white p-4 transition-all duration-300">
            <nav className="space-y-2">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.to === '/'}
                        className={getLinkClass}
                        onClick={handleDispatch(link.label)}
                    >
                        <link.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}
export default Sidebar