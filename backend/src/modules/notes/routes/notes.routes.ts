 import {createNotes,getAllNotes,patchUpdateNotes,deleteNotes,pinNotes ,unPinNotes,getPinnedNotes, getMyNotes, createNoteOrder, verifyPyament, getPurchasedNotes, getNoteById} from "../controllers/notes.controller.js"
import express from "express"
import {authMiddleware} from "../../../common/middlewares/auth.middleware.js"
import { validate } from "../../../common/middlewares/validation.middleware.js"
import { createNotesSchema, note_idParamSchema, patchUpdateNotesSchema } from "../validations/notes.validations.js"

const router = express.Router()

router.post("/create",authMiddleware,validate({body:createNotesSchema}),createNotes)


router.get("/all",getAllNotes)


router.patch("/:note_id",authMiddleware,validate({
    body:patchUpdateNotesSchema,
    params:note_idParamSchema
}),patchUpdateNotes)


router.delete("/:note_id",authMiddleware,deleteNotes)

router.patch("/pin/:note_id",authMiddleware,pinNotes)

router.patch("/un-pin/:note_id",authMiddleware,unPinNotes)

router.get("/pin",authMiddleware,getPinnedNotes)
router.get("/my",authMiddleware,getMyNotes)

// router.post("/:note_id/purchase",authMiddleware,createNotePurchase)

router.post("/:note_id/order",authMiddleware,createNoteOrder)

router.post("/:note_id/verify",authMiddleware,verifyPyament)

router.get("/purchased-notes",authMiddleware,getPurchasedNotes)

router.get("/:note_id",authMiddleware,getNoteById)
export default router


