import { useQuery } from "@tanstack/react-query";
import { getNoteApi } from "../api/note.api";

export const useGetNotes = () => {
  return useQuery({
    queryKey: ["notes-all"],
    queryFn: getNoteApi,
  });
};
