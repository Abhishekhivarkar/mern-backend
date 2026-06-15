export interface GetAllNotesQueryDto{
 page?:string,
 limit?:string,
 search?:string,
 category:string,
 is_paid:boolean
 minPrice:number,
 maxPrice:number
}