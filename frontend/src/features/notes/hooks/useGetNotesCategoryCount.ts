import { useQuery } from "@tanstack/react-query";
import { getNotesCategoriesCountApi } from "../api/note.api";

export const useGetNotesCategoriesCount = () => {
  return useQuery({
    queryKey: ["notes-category-count"],
    queryFn: getNotesCategoriesCountApi,
  });
};
