import {useMutation,useQueryClient} from "@tanstack/react-query"
import { createNoteApi } from "../api/note.api"

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


