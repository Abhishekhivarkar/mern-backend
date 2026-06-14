import { useQuery } from "@tanstack/react-query";
import { getAllFeaturedNotesApi } from "../api/note.api";

export const useGetAllFeaturedNotes = () => {
  return useQuery({
    queryKey: ["notes-featured-all"],
    queryFn: getAllFeaturedNotesApi,
  });
};
