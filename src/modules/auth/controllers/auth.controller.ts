import type { Request, Response } from "express"

import { asyncHandler } from "../../../utils/asyncHandler.util.js"

import { registerService } from "../services/auth.service.js"

import type {
  userRegisterReqBodyType,
} from "../types/requests/auth.request.js"

import type {
  userRegisterResBodyType,
} from "../types/responses/auth.response.js"

export const register = asyncHandler(
  async (
    req: Request<
      {},
      userRegisterResBodyType,
      userRegisterReqBodyType
    >,

    res: Response<userRegisterResBodyType>
  ) => {

    const user = await registerService(req.body)

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user._id.toString(),
    })
  }
)