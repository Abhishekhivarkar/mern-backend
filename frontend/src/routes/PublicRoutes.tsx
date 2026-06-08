import {Navigate,Outlet} from "react-router-dom"

import { useAuthStore } from "../features/auth/store/auth.store"
import { Loader } from "../common/components/IsLoading"


export const PublicRoute = () =>{
    const user = useAuthStore(
        state => state.user
    )
    const loading = useAuthStore(
        state => state.loading
    )

    if(loading){
        return <Loader/>
    }
    if(user){
        return(
            <Navigate
            to="/"
            replace
            />
        )
    }

    return <Outlet/>
}