import axios from "../../../common/api/axios";
import type { CreateNotePayload} from "../types/note.type";

export const createNoteApi = async (data:CreateNotePayload) =>{
    const response = await axios.post("/notes/create",data)

    return response.data
}

export interface GetAllNotesParams{
    page?:number,
    limit?:number,
    search?:string,
    category?:string,
    is_paid?:boolean,
    minPrice?:number,
    maxPrice?:number
}
export const getNoteApi = async (
    params?:GetAllNotesParams
) =>{
    const response = await axios.get("/notes/all",{
        params
    })

    
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


export const getNotesStatsApi = async() =>{
    const response = await axios.get("/notes/stats")

    return response.data
}