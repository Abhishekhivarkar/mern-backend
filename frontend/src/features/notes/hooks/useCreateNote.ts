

import {useMutation,useQuery,useQueryClient} from "@tanstack/react-query"


import { createNoteApi, getNoteApi } from "../api/note.api"

export const useCreateNote = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:createNoteApi,
        onSuccess:()=>{
                queryClient.invalidateQueries({
                    queryKey:["notes"]
                })
        }
    })
}

export const useGetNotes = () =>{
    return useQuery({
        queryKey:["notes"],
        queryFn:getNoteApi
    })
}

