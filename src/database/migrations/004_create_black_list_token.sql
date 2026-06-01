CREATE TABLE black_list_token(
    black_list_token_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    access_token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)