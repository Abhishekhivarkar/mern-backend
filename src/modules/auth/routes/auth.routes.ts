import express from "express"
import {register,login, logout, refreshToken} from "../controllers/auth.controller.js"
import { authLimitMiddleware } from "../../../common/middlewares/rateLimit.middleware.js"
import { authMiddleware } from "../../../common/middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register",register)
router.post("/login",authLimitMiddleware,login)
router.post("/logout",logout)
router.post("/refresh-token",refreshToken)

export default router