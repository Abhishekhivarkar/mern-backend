import { useEffect } from "react";

import { getMeApi } from "../api/auth.api";

import { useAuthStore } from "../store/auth.store";

export const AuthInitializer = () =>{
    const setUser = useAuthStore(
        state => state.setUser
    )

    const setLoading = useAuthStore(
        state => state.setLoading
    )

    useEffect(()=>{
        const initialize = async () =>{
            try{
                const data = await getMeApi()

                setUser(data.data)


            }catch(error){
                console.log("User not authenticated!")
                console.log(error)
            }finally{
                setLoading(false)
            }
        }

        initialize()
    },[setUser,setLoading])
    return null
}