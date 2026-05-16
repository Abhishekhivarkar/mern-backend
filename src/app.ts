import express from "express"
import type {Request,Response} from "express"
import registerRoutes from "./modules/auth/routes/auth.routes.js"
import loginRoutes from "./modules/auth/routes/auth.routes.js"
import notesRoutes from "./modules/product/routes/notes.routes.js"
const app = express()

app.use(express.json())

app.use("/api/auth",registerRoutes)
app.use("/api/auth",loginRoutes)
app.use("/api/notes",notesRoutes)
app.use("/health",(_:Request,res:Response):void=>{
 res.status(200).json({
  success:true,
  status:"OK"
 })
})

export default app