

export interface Session {
    session_id:string,
    user_id:string,
    refresh_token_hash:string,
    ip:string,
    user_agent:string,
    is_revoked:boolean,
    expires_at:Date,
    created_at:Date,
    updated_at:Date
}