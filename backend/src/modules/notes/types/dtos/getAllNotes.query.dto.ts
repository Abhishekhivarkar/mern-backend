export interface GetAllNotesQueryDto{
 page?:string,
 limit?:string,
 search?:string,
 category?:"PROGRAMMING"|
    "DATA_STRUCTURE"|
    "COLLEGE_NOTES"|
    "WEB_DEVELOPMENT"|
    "DATABASE"
 is_paid?:string
 minPrice?:string,
 maxPrice?:string,
 isPaid?:string,
 isFeatured?:string,
 isPinned?:string
}