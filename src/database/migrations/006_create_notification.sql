CREATE TABLE notifications(
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,

    notification_type VARCHAR(100) NOT NULL,

    notification_name varchar(100) NOT NULL,

    notification_message TEXT NOT NULL,

    meta_data JSONB DEFAULT '{}'::jsonb,

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()

)