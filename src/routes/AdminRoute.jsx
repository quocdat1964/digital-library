import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const { user } = useSelector((state) => state.auth)

    const isAdminOrBoss = user && (user.role === 'ADMIN' || user.role === 'BOSS')
    return isAdminOrBoss ? <Outlet /> : <Navigate to='/' replace />
}

export default AdminRoute