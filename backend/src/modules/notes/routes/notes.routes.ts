 import {createNotes,getAllNotes,patchUpdateNotes,deleteNotes,pinNotes ,unPinNotes,getPinnedNotes, getMyNotes, createNoteOrder, verifyPyament, getPurchasedNotes, getNoteById, getNotesCategoriesCount, getAllFeaturedNotes} from "../controllers/notes.controller.js"
import express from "express"
import {authMiddleware} from "../../../common/middlewares/auth.middleware.js"
import { validate } from "../../../common/middlewares/validation.middleware.js"
import { createNotesSchema, note_idParamSchema, patchUpdateNotesSchema } from "../validations/notes.validations.js"
import { upload } from "../../../common/middlewares/upload.middleware.js"

const router = express.Router()

router.post("/create", authMiddleware, upload.single("images"), validate({
  body: createNotesSchema
}), createNotes);

router.get("/all", getAllNotes);

router.get("/pin", authMiddleware, getPinnedNotes);
router.get("/my", authMiddleware, getMyNotes);

router.get("/count", getNotesCategoriesCount);

router.get("/purchased-notes", authMiddleware, getPurchasedNotes);

router.get("/featured",getAllFeaturedNotes)
router.patch("/pin/:note_id", authMiddleware, pinNotes);
router.patch("/un-pin/:note_id", authMiddleware, unPinNotes);

router.post("/:note_id/order", authMiddleware, createNoteOrder);
router.post("/:note_id/verify", authMiddleware, verifyPyament);

router.patch("/:note_id", authMiddleware, validate({
  body: patchUpdateNotesSchema,
  params: note_idParamSchema
}), patchUpdateNotes);

router.delete("/:note_id", authMiddleware, deleteNotes);

router.get("/:note_id", authMiddleware, getNoteById);

export default router;