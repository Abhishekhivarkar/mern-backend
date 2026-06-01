CREATE TABLE notes(
    note_id UUID PRIMARY KEY gen_random_uuid(),
    note_name TEXT NOT NULL,
    note_content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE 

)

CREATE INDEX idx_notes_user_id ON notes(user_id)