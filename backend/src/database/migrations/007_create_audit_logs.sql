CREATE TABLE auditlogs(
 
 audit_log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 
 user_id UUID NOT NULL REFERENCES users(user_id),
 
 action VARCHAR(50) NOT NULL,
 
 entity_type VARCHAR(50) NOT NULL,
 
 enyity_id VARCHAR(50) NOT NULL,
 
 old_value JSONB,
new_value JSONB,

ip_address VARCHAR(255),

user_agent VARCHAR(255),

created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
)

