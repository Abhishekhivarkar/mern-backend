import axios from "../../../common/api/axios";
import type { CreateNotePayload} from "../types/note.type";

export const createNoteApi = async (data:CreateNotePayload) =>{
    const response = await axios.post("/notes/create",data)

    return response.data
}
