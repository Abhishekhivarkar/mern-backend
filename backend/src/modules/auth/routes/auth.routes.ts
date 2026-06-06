import express from "express"
import {register,login,logout , refreshToken, getMe} from "../controllers/auth.controller.js"
import { authLimitMiddleware } from "../../../common/middlewares/rateLimit.middleware.js"
import { validate } from "../../../common/middlewares/validation.middleware.js"
import { registerSchema, loginSchema } from "../validations/auth.validation.js"
import { authMiddleware } from "../../../common/middlewares/auth.middleware.js"
const router = express.Router()

router.post("/register",validate({body:registerSchema}),register)

router.post("/login",authLimitMiddleware,validate({body:loginSchema}),login)

router.post("/logout",logout)

router.post("/refresh-token",refreshToken)

router.get("/me",authMiddleware,getMe)
export default router