import express from "express"
import type {Request,Response} from "express"
import authRoutes from "./modules/auth/routes/auth.routes.js"
import notesRoutes from "./modules/product/routes/notes.routes.js"
import { loggerMiddleware } from "./common/middlewares/logger.middleware.js"
import { rateLimitMiddleware } from "./common/middlewares/rateLimit.middleware.js"
import cookieParser from "cookie-parser"
import helmet from "helmet"
const app = express()
app.disable("x-powered-by")
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(loggerMiddleware)
app.use(rateLimitMiddleware)
app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)

app.use("/health",(_:Request,res:Response):void=>{
 res.status(200).json({
  success:true,
  status:"OK"
 })
})

export default app