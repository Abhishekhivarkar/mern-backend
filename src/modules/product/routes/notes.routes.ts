import {createNotes} from "../controllers/notes.controller.js"
import express from "express"
import {authMiddleware} from "../../../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/create",authMiddleware,createNotes)

export default router