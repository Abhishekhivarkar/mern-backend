CREATE TABLE note_versions(
    note_versions_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(user_id),

    note_version INT NOT NULL,

    title VARCHAR(50) NOT NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_note_versions_note_versions_id ON note_versions(note_versions_id)