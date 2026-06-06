import axios from "../../../common/api/axios";

import type { RegisterPayload } from "../types/auth.types";
import type { LoginPayload } from "../types/login.types";

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
    const response = await axios.post("/auth/login",data)


    return response.data
}