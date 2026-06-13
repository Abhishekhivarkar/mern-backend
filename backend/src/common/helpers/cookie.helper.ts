import {
  ACCESS_COOKIE_NAME,
  ACCESS_COOKIE_OPTIONS,
  REFRESH_COOKIE_NAME,
  REFRESH_COOKIE_OPTIONS,
} from "../constants/cookie.constant.js";
import type { Response } from "express";

export const setRefreshTokenCookie = (
  refreshToken: string,
  res: Response,
): void => {
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, REFRESH_COOKIE_OPTIONS);
};

export const removeRefreshTokenCookie = (res: Response): void => {
  res.clearCookie(REFRESH_COOKIE_NAME);
};
export const setAccessTokenCookie = (
  accessToken: string,
  res: Response,
): void => {
  res.cookie(ACCESS_COOKIE_NAME, accessToken, ACCESS_COOKIE_OPTIONS);
};

export const removeAccessTokneCookie = (res: Response): void => {
  res.clearCookie(ACCESS_COOKIE_NAME);
};
