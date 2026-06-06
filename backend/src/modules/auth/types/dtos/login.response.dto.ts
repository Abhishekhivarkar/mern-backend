export interface LoginResponseDto{
  success:boolean;
  message:string;
  data:{
    email:string,
    password:string
  };

}