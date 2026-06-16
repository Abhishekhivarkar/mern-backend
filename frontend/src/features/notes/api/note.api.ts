import axios from "../../../common/api/axios";
import type {
  CreateNotePayload,

  GetAllNotesParams,

  GetAllNotesResponse,
} from "../types/note.type";

export const createNoteApi = async (data: CreateNotePayload) => {
  const response = await axios.post("/notes/create", data);

  return response.data;
};

export const getNoteApi = async (
  params?: GetAllNotesParams
): Promise<GetAllNotesResponse> => {
  const response = await axios.get<GetAllNotesResponse>(
    "/notes/all",
    {
      params,
    }
  );

  return response.data;
};

export const getNotesCategoriesCountApi = async () => {
  const response = await axios.get("/notes/count");

  return response.data;
};

export const getAllFeaturedNotesApi = async () => {
  const response = await axios.get("/notes/featured");

  return response.data;
};

export const getNotesStatsApi = async () => {
  const response = await axios.get("/notes/stats");

  return response.data;
};
