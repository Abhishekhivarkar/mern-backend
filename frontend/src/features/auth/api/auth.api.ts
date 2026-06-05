import axios from "../../../common/api/axios";

import type { RegisterPayload } from "../types/auth.types";

export const registerApi = async(
    data:RegisterPayload
)=>{
    const response = await axios.post("/auth/register",data)

    return response.data
}