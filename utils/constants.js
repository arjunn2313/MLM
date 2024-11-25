const ROLES = {
  ADMIN: "admin",
  AGENT: "agent",
  USER: "user",
};

const MESSAGES = {
  AUTH: {
    UNAUTHORIZED: "You are not authorized to perform this action.",
    INVALID_TOKEN: "Invalid token, please log in again.",
    LOGIN_SUCCESS: "Login successful.",
    REGISTER_SUCCESS: "Registration successful.",
  },
  USER: {
    NOT_FOUND: "User not found.",
    CREATED: "User created successfully.",
    UPDATED: "User updated successfully.",
    DELETED: "User deleted successfully.",
  },
  ADDRESS: {
    NOT_FOUND: "Address not found.",
    CREATED: "Address created successfully.",
    UPDATED: "Address updated successfully.",
    DELETED: "Address deleted successfully.",
  },
  PRODUCT: {
    CREATED: "Product created successfully.",
    UPDATED: "Product updated successfully.",
    DELETED: "Product deleted successfully.",
    NOT_FOUND: "Product not found.",
  },
  ORDER: {
    PLACED: "Order placed successfully.",
    CANCELLED: "Order cancelled successfully.",
  },
  OTP: {
    SENT: "OTP sent successfully.",
    INVALID: "Invalid OTP, please try again.",
    EXPIRED: "OTP has expired, please request a new one.",
    VERIFIED: "OTP verified successfully.",
  },
  SERVER: {
    ERROR: "An internal server error occurred. Please try again later.",
    TIMEOUT: "Server timeout, please try again.",
  },
  PHONE: {
    TAKEN: "Phone Number already registered",
  },
  PASSWORD: {
    WEAK: "Password is too weak. Please use a combination of letters, numbers, and special characters.",
    MISMATCH: "Passwords do not match. Please try again.",
    LENGTH: "Password must be at least 8 characters long.",
    RESET_SUCCESS: "Password reset successfully.",
    INVALID: "Invalid password. Please try again.",
  },
};

const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
};

module.exports = {
  ROLES,
  MESSAGES,
  STATUS_CODES,

  PAGINATION,
};
