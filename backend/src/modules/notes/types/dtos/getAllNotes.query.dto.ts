export interface GetAllNotesQueryDto{
 page?:string,
 limit?:string,
 search?:string,
 category:string,
 minPrice:number,
 maxPrice:number
}