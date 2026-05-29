import express from "express"
import {register,login, logout, refreshToken} from "../controllers/auth.controller.js"
import { authLimitMiddleware } from "../../../common/middlewares/rateLimit.middleware.js"
import { validate } from "../../../common/middlewares/validation.middleware.js"
import { registerSchema } from "../validations/auth.validation.js"
const router = express.Router()

router.post("/register",validate({body:registerSchema}),register)
router.post("/login",authLimitMiddleware,login)
router.post("/logout",logout)
router.post("/refresh-token",refreshToken)

export default router