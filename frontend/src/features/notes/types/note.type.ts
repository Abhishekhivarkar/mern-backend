export interface CreateNotePayload{
    note_name:string,
    note_content:string
}

 interface CategoryEnum{
    Programming:"PROGRAMMING",
    data_structure:"DATA_STRUCTURE",
    college_notes:"COLLEGE_NOTES",
    web_development:"WEB_DEVELPOMENT",
    database:"DATABASE"
}

export interface NoteType{
    note_id: string,
    user_id:string,
    note_name:string,
    note_content:string,
    price:number,
    category:string,
    images:string,
    created_at:string,
    is_pinned:boolean,
    is_paid:boolean,
    is_featured:boolean,
    total:number
}

export interface GetAllNotesResponse{
    success:boolean,
    data:{
        notes:NoteType[],
        total:number,
        page:number,
        limit:number
    }

}

export interface GetAllNotesParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: CategoryEnum;
  is_paid?: boolean;
  minPrice?: number;
  maxPrice?: number;
}