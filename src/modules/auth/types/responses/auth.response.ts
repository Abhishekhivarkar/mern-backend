export interface userRegisterResBodyType{
 success:boolean,
 message:string,
 data:string
}

export interface userLoginResBodyType{
  success:boolean;
  message:string;
  data:string;
  accessToken:string
}