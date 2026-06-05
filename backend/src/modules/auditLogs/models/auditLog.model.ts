export interface AuditLog{
 audit_log_id:string,
 user_id:string,
 action: string,
 entity_type:string,
 entity_id:string,
 old_value:unknown,
 new_value:unknown,
 ip_address:string,
 user_agent:string,
 created_at:Date,
 updated_at:Date
}

