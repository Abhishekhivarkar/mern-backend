import axios from "../../../common/api/axios";
import type { CreateNotePayload} from "../types/note.type";

export const createNoteApi = async (data:CreateNotePayload) =>{
    const response = await axios.post("/notes/create",data)

    return response.data
}

export const getNoteApi = async () =>{
    const response = await axios.get("/notes/all")

    
    return response.data
}

export const getNotesCategoriesCountApi = async() =>{
    const response = await axios.get("/notes/count")

    return response.data
}

export const getAllFeaturedNotesApi = async() =>{
    const response = await axios.get("/notes/featured")

    return response.data
}