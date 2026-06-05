import {pool} from "../../../configs/db.config.js"
import { AuditLog } from "../models/auditLog.model.js"

export const auditLog =async (user_id:string | undefined,action:string,entity_type:string,entity_id:string | undefined,old_value?:unknown | null,new_value?:unknown,ip_address?:string,user_agent?:string) =>{
 const result = await pool.query<AuditLog>(
  `
  INSERT INTO auditlogs(user_id,action,entity_type,entity_id,old_value,new_value,ip_address,user_agent)VALUES($1,$2,$3,$4,$5,$6,$7,$8)
  `,
  [user_id,action,entity_type,entity_id,old_value,new_value,ip_address,user_agent]
  )
}