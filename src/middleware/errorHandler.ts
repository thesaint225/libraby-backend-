import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../helpers/errorResponse";

const errorHandler = (
  err: Error | ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   default error response

  let statusCode = 500;
  let message = "Server Error ";

  // Handle Custom ErrorResponse
  if (err instanceof ErrorResponse) {
    statusCode = err.statusCode || 500;
    message = err.message || "Server Error";
  }

  // Log the error (include stack for debugging)
  console.error(`[ERROR] ${err.message}\nStack: ${err.stack || err}`);

  // Handle Mongoose duplicate key error
  if ((err as any).code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered.";
  }

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    message = Object.values(err.errors)
      .map((val) => (val as any).message) // Explicitly extract `val.message`
      .join(", "); // Combine messages into a single string
    statusCode = 400; // Validation errors are client-side issues
  }
  // Final error response
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorHandler;
