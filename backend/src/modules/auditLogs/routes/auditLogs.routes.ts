import express from 'express'
import { getAllAuditLogs } from '../controllers/auditLogs.controller.js'

const router = express.Router()

router.get("/",getAllAuditLogs)

export default router