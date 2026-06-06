import { useMutation } from "@tanstack/react-query";

import { loginApi } from "../api/auth.api";

export const useLogin = () =>{
    return useMutation({
        mutationFn:loginApi
    })
}