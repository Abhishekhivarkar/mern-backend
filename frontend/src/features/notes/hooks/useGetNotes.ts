import { useQuery } from "@tanstack/react-query";
import { getNoteApi } from "../api/note.api";

export const useGetNotes = (params={page:1,limit:8}) => {
  return useQuery({
    queryKey: ["notes-all",params],
    queryFn:()=> getNoteApi(params),
  });
};
