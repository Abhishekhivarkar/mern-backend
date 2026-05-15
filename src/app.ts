import express from "express"
import type {Request,Response} from "express"
const app = express()

app.use(express.json())

app.use("/health",(_:Request,res:Response):void=>{
 res.status(200).json({
  success:true,
  status:"OK"
 })
})

export default app