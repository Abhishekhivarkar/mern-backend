import { Request } from "express"

export interface LogoutDto extends Request{
  cookies:Request["cookies"] & {
    refreshToken?:string
  }
  headers:Request["headers"] & {
    authorization?:string
  }
}