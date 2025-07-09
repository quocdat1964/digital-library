import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateToken } from "./features/auth/authSlice";

const AppInitializer = ({children}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if(token){
            console.log('Token found, attemping to validate')
            dispatch(validateToken(token))
        }
    }, [dispatch])
    return children
}

export default AppInitializer