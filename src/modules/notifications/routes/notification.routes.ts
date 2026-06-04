import  express from "express";
import { getAllNotifications,/* getUnreadNotifications */} from "../controllers/notification.controller.js";

const router = express.Router()


router.get("/",getAllNotifications)
// router.get("/unread",getUnreadNotifications)
export default router