/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response, type NextFunction } from 'express'

/**
 * Centralized error handler that dynamically handles different types of errors.
 */
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default values
  const statusCode = error.statusCode || error.status || 500;
  const message = error.message || 'Internal Server Error';

  console.error(`[${req.method}] ${req.url} - ${statusCode}: ${message}`);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: process.env.NODE_ENV === 'development' ? error.stack : undefined, // Show stack trace in development mode
  });
};
