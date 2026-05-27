import { Request,Response } from "express"
import { asyncHandler } from "../../../common/utils/asyncHandler.util.js"
import { getAllNotificationService, getUnreadNotificationsService } from "../services/notification.service.js"
import { HTTP_STATUS } from "../../../common/constants/httpStatus.constant.js"
import { MESSAGES } from "../../../common/constants/messages.constant.js"


export const getAllNotifications = asyncHandler(async(req:Request,res:Response) =>{
    const notifications = await getAllNotificationService()

    return res.status(HTTP_STATUS.OK).json({
        success:true,
        data:notifications
    })

})

export const getUnreadNotifications = asyncHandler(async(req:Request,res:Response) =>{
    const notifications = await getUnreadNotificationsService()

    return res.status(HTTP_STATUS.OK).json({
        success:true,
        data:notifications
    })


})