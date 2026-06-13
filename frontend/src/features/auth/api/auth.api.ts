import axios from "../../../common/api/axios";

import type { RegisterPayload,LoginPayload } from "../types/auth.types";


export const registerApi = async(
    data:RegisterPayload
)=>{
    const response = await axios.post("/auth/register",data)

    return response.data
}

export const getMeApi = async(

) =>{
    const response = await axios.get("/auth/me")

    return response.data
}

export const loginApi = async (data:LoginPayload) =>{
    const response = await axios.post("/auth/login",data,{
        withCredentials:true
    })

console.log("Api response",response.data)
    return response.data
}

export const logoutApi = async () =>{
    const response = await axios.post("/auth/logout")

    return response.data
}