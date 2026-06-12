import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createNoteApi,
  getAllFeaturedNotesApi,
  getNoteApi,
  getNotesCategoriesCountApi,
} from "../api/note.api";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes-all"],
      });

      queryClient.invalidateQueries({
        queryKey:["notes-category-count"]
      })

      queryClient.invalidateQueries({
        queryKey:["notes-featured-all"]
      })
    },
  });
};

export const useGetNotes = () => {
  return useQuery({
    queryKey: ["notes-all"],
    queryFn: getNoteApi,
  });
};

export const useGetNotesCategoriesCount = () => {
  return useQuery({
    queryKey: ["notes-category-count"],
    queryFn: getNotesCategoriesCountApi,
  });
};

export const useGetAllFeaturedNotes = () => {
  return useQuery({
    queryKey: ["notes-featured-all"],
    queryFn: getAllFeaturedNotesApi,
  });
};
