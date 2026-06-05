import express from "express"
import type {Request,Response} from "express"
import authRoutes from "./modules/auth/routes/auth.routes.js"
import notesRoutes from "./modules/notes/routes/notes.routes.js"
import { loggerMiddleware } from "./common/middlewares/logger.middleware.js"
import { rateLimitMiddleware } from "./common/middlewares/rateLimit.middleware.js"
import notificationRoutes from "./modules/notifications/routes/notification.routes.js"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { errorMiddleware } from "./common/middlewares/error.middleware.js"

import auditLogsRoutes from "./modules/auditLogs/routes/auditLogs.routes.js"
const app = express()
app.disable("x-powered-by")
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(loggerMiddleware)

app.use(rateLimitMiddleware)

app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)
app.use("/api/notification", notificationRoutes)
app.use("/api/audit-logs", auditLogsRoutes)
app.use("/health",(_:Request,res:Response):void=>{
 res.status(200).json({
  success:true,
  status:"OK"
 })
})

app.use(errorMiddleware)
export default app