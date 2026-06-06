import type { User } from "../types/auth.types";

import {create} from "zustand"

interface AuthState{
    user: User | null,
    loading:boolean,
    setUser:(user:User)=>void,
    clearUser:()=>void,
    setLoading:(loading:boolean)=>void
}

export const useAuthStore = create<AuthState>(
    (set)=>({
        user:null,
        loading:true,
        setUser:(user)=>
            set({
                user
            }),
        clearUser:()=>
            set({
                user:null
            }),
        setLoading:(loading)=>
            set({
                loading
            })
        
})
)

