 import {createNotes/*,getAllNotes,patchUpdateNotes,deleteNotes,pinNotes,getPinnedNotes, unPinNotes*/} from "../controllers/notes.controller.js"
import express from "express"
import {authMiddleware} from "../../../common/middlewares/auth.middleware.js"
import { validate } from "../../../common/middlewares/validation.middleware.js"
import { createNotesSchema, noteIdParamSchema, patchUpdateNotesSchema } from "../validations/notes.validations.js"

const router = express.Router()

router.post("/create",authMiddleware,validate({body:createNotesSchema}),createNotes)

/*
router.get("/all",authMiddleware,getAllNotes)


router.patch("/:noteId",authMiddleware,validate({
    body:patchUpdateNotesSchema,
    params:noteIdParamSchema
}),patchUpdateNotes)


router.delete("/:noteId",authMiddleware,deleteNotes)

router.patch("/pin/:noteId",authMiddleware,pinNotes)

router.get("/pin",authMiddleware,getPinnedNotes)
router.patch("/un-pin/:noteId",authMiddleware,unPinNotes)

*/
export default router


