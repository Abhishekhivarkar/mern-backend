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

export type GetNoteData = {
    note_name:string,
    note_content:string,
    category:CategoryEnum,
    minPrice:number,
    maxPrice:number,
    images:string,
    price:number
}

