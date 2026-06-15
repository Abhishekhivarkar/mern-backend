import { useQuery } from "@tanstack/react-query"
import { getNotesStatsApi } from "../api/note.api"

export const useGetNotesStats = () =>{
        return useQuery({
                queryKey:["get-notes-stats"],
                queryFn:getNotesStatsApi
        })
}