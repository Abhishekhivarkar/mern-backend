import express from "express"
import {register,login} from "../controllers/auth.controller.js"
import { authLimitMiddleware } from "../../../common/middlewares/rateLimit.middleware.js"

const router = express.Router()

router.post("/register",register)
router.post("/login",authLimitMiddleware,login)
export default router