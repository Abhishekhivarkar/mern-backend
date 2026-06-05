import { HTTP_STATUS } from "../../../common/constants/httpStatus.constant.js"
import { MESSAGES } from "../../../common/constants/messages.constant.js"
import { AppError } from "../../../common/utils/appError.util.js"
import { getAllAuditLogsRespoitory } from "../repositories/auditLogs.repository.js"

export const getAllAuditLogsService = async() =>{
    const auditLogs = await getAllAuditLogsRespoitory()

    if(auditLogs.length === 0){
        throw new AppError(MESSAGES.AUDITLOGS.ZERO_AUDIT_LOGS,HTTP_STATUS.BAD_REQUEST)
    }

    return auditLogs

}