export const MESSAGES = {
  AUTH: {
    REGISTER_SUCCESS: "User rsegistered successfully!",
    LOGIN_SUCCESS: "User login successfully!",
    ALREADY_REGISTERED: "User already registered!",
    USER_NOT_FOUND: "User not found!",
    WRONG_CREDENTIALS: "Incorrect credentials!",
    FORBIDDEN: "Invalid or expired token!",
    TOKEN_NOT_FOUND: "Token not found!",
    SESSION_NOT_FOUND: "Session not found!",
    REFRESH_TOKEN_REUSE: "Refresh token reusee detected!",
    SESSION_REVOKED: "Session revoked! please login again.",
    SESSION_EXPIRED: "Session expired! please login again.",
  },

  PRODUCT: {
    CREATED_SUCCESS: "Product created successfully!",
    UPDATED_SUCCESS: "Product updated successfully!",
    DELETE_SUCCESS: "Product deleted successfully!",
    PINNED: "Note pinned successfully!",
    UNPINNED: "Note unpinned successfully!",
    NOT_FOUND: "Notes not found!",
    PIN_LIMIT_EXCEEDED: "You can pin up to 5 notes only!",
    ALREADY_PINNED: "Note already pinned!",
    ALREADY_UNPINNED: "Note already un pinned!",
    ZERO_NOTES: "0 notes found",
    NOTE_PURCHASE_CREATED: "Note purchse successfully!",
    NOT_PUBLISHED: "Note not published yet!",
    CAN_NOT_PURCHASE_OWN_NOTE: "Can not purchase own note!",
    ALREADY_PURCHASED: "Note already purchased!",
    NOTE_IS_FREE: "Note is free!",
    PURCHASE_SUCCESS: "Note purchased successfuly!",
    PAID_NOTE:"Can not read paid note!",
    NOTE_ORDER_CREATED:"Note order created successfully!",
    INVALID_PRICE:"Note price is invalid!"
  },

  LIMITER: {
    TOO_MANY_REQUESTS: "To many requests! please try after some time",
  },

  NOTIFICATION: {
    NOTIFICATION_NOT_FOUND: "Notification not found!",
  },
  AUDITLOGS: {
    ZERO_AUDIT_LOGS: "0 audit logs found",
  },

  COMMON:{
      IDEMPOTENCY_KEY_REQUIRED: "Idempotency key is required!",
      PAYMENT_VERIFIED: "Payment verified successfully!",
      INVALID_PAYMENT_SIGNATURE:"Invalid payment signature!",
  }
};
