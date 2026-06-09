CREATE TABLE note_purchases (
    purchase_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    note_id UUID NOT NULL REFERENCES notes(note_id) ON DELETE CASCADE,

    buyer_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,

    seller_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,

    idempotency_key VARCHAR(255) UNIQUE NOT NULL,

    amount NUMERIC(10,2) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'COMPLETED',

    razorpay_order_id VARCHAR(255),

    razorpay_payment_id VARCHAR(255),

    payment_status VARCHAR(30) DEFAULT 'PENDING',

    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (buyer_id, note_id)
);