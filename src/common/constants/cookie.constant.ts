
import { config } from "../../configs/env.config.js"
import type {CookieOptions} from "express"

export const REFRESH_COOKIE_NAME = "refreshToken"

export const REFRESH_COOKIE_OPTIONS:CookieOptions = {
    httpOnly:true,
    secure:config.NODE_ENV === "production",
    sameSite:"strict",
    maxAge:7 * 24 * 60 * 60 * 1000
}