import { HTTP_STATUS } from "../../../common/constants/httpStatus.constant.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.util.js";
import type {Request,Response} from "express"
import { getAllAuditLogsService } from "../services/auditLogs.service.js";

export const getAllAuditLogs = asyncHandler(async(req:Request,res:Response) =>{
    const auditLogs = await getAllAuditLogsService()

    return res.status(HTTP_STATUS.OK).json({
        success:true,
        data:auditLogs
    })
})  