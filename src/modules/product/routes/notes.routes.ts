import {createNotes,getAllNotes,patchUpdateNotes,deleteNotes,pinNotes,getPinnedNotes} from "../controllers/notes.controller.js"
import express from "express"
import {authMiddleware} from "../../../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/create",authMiddleware,createNotes)

router.get("/all",authMiddleware,getAllNotes)
router.patch("/:noteId",authMiddleware,patchUpdateNotes)
router.delete("/:noteId",authMiddleware,deleteNotes)

router.patch("/pin/:noteId",authMiddleware,pinNotes)

router.get("/pin",authMiddleware,getPinnedNotes)
export default router


