import { REFRESH_COOKIE_NAME,REFRESH_COOKIE_OPTIONS } from "../constants/cookie.constant.js"
import type {Response} from "express"

export const setRefreshTokenCookie = (refreshToken:string,res:Response):void =>{
    res.cookie(
    REFRESH_COOKIE_NAME,
    refreshToken,
    REFRESH_COOKIE_OPTIONS
  
  )
}

export const removeRefreshTokenCookie = (res:Response):void =>{
  res.clearCookie(
    REFRESH_COOKIE_NAME
  )
}
