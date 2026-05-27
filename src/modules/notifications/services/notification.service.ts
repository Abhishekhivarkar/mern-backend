import { HTTP_STATUS } from "../../../common/constants/httpStatus.constant.js"
import { MESSAGES } from "../../../common/constants/messages.constant.js"
import { AppError } from "../../../common/utils/appError.util.js"
import { getAllNotificatiosnRepository, getUnreadNotificationsRepository } from "../repositories/notification.repository.js"

export const getAllNotificationService = async() =>{

    const notifications = await getAllNotificatiosnRepository()
    if(!notifications || notifications.length === 0){
        throw new AppError(MESSAGES.NOTIFICATION.NOTIFICATION_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
    }
    return notifications

}


export const getUnreadNotificationsService = async() => {
    const notifications = await getUnreadNotificationsRepository()

    return notifications
}