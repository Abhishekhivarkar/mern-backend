import type {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import { AppError } from "../utils/appError.util.js";

const handlePostgresError = (
  err: any
): AppError | any => {
  switch (err.code) {
    case "23505":
      return new AppError(
        "Resource already exists",
        409
      );

    case "23503":
      return new AppError(
        "Referenced resource does not exist",
        400
      );

    case "23502":
      return new AppError(
        `${err.column} is required`,
        400
      );

    case "22P02":
      return new AppError(
        "Invalid input format",
        400
      );

    case "23514":
      return new AppError(
        "Constraint validation failed",
        400
      );

    default:
      return err;
  }
};

const handleJWTError = () => {
  return new AppError(
    "Invalid token, please login again",
    401
  );
};

const handleJWTExpiredError = () => {
  return new AppError(
    "Your token has expired, please login again",
    401
  );
};

const sendDevError = (
  err: any,
  res: Response
) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    status: err.status || "error",
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendProdError = (
  err: any,
  res: Response
) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  console.error("Unknown Error:", err);

  return res.status(500).json({
    success: false,
    status: "error",
    message: "Something went wrong",
  });
};

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode =
    err.statusCode || 500;

  err.status =
    err.status || "error";

  if (
    process.env.NODE_ENV ===
    "development"
  ) {
    return sendDevError(err, res);
  }

  if (
    process.env.NODE_ENV ===
    "production"
  ) {
    let error = err;

    if (err?.code) {
      error = handlePostgresError(err);
    }

    if (
      err instanceof
      jwt.JsonWebTokenError
    ) {
      error = handleJWTError();
    }

    if (
      err instanceof
      jwt.TokenExpiredError
    ) {
      error = handleJWTExpiredError();
    }

    return sendProdError(
      error,
      res
    );
  }

  return sendProdError(err, res);
};