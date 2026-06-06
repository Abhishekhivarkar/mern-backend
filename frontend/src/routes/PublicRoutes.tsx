import {Navigate} from "react-router-dom"

import { useAuthStore } from "../features/auth/store/auth.store"
import type { ReactNode } from "react"

interface PublicRouteProps{
    children:ReactNode
}
export const PublicRoute = ({
    children
}:PublicRouteProps) =>{
    const user = useAuthStore(
        state => state.user
    )
    const loading = useAuthStore(
        state => state.loading
    )

    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    if(user){
        return(
            <Navigate
            to="/"
            replace
            />
        )
    }

    return children
}