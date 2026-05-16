import {createNotes,getAllNotes} from "../controllers/notes.controller.js"
import express from "express"
import {authMiddleware} from "../../../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/create",authMiddleware,createNotes)

router.get("/all",authMiddleware,getAllNotes)
export default router


