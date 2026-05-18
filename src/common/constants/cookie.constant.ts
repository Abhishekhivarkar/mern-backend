import {CookieOptions} from "express"
import {config} from "../config/env.configs.js"


export const REFRESH_COOKIE_NAME = "refreshToken"


export const REFRESH_COOKIE_OPTIONS:cookieOptions = {
 httpOnly:true,
 secure:config.NODE_ENV === "production",
 sameSite:"strict",
 maxAge:7 * 24 * 60 * 60 * 1000
}