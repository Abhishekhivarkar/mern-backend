export interface RegisterResponseDto{
 success:boolean,
 message:string,
 data:{
    user_id:string,
    email:string
 }
}