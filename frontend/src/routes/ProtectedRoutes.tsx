import {Navigate} from "react-router-dom"
import { useAuthStore } from "../features/auth/store/auth.store"
import type { ReactNode } from "react"
interface ProtectedRouteProps{
    children:ReactNode
}
export const ProtectedRoute=({
    children
}:ProtectedRouteProps) =>{
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

    return children
}
