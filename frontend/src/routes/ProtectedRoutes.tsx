import {Navigate,Outlet} from "react-router-dom"
import { useAuthStore } from "../features/auth/store/auth.store"

export const ProtectedRoute=() =>{
    const user = useAuthStore(
        state => state.user
    )

    const loading = useAuthStore(
        state => state.loading
    )

    if(loading){
        return <div>Loading...</div>
    }

    if(!user){
        return (
            <Navigate
            to="/register"
            replace
            />
        )
    }

    return <Outlet/>
}
