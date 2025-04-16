import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.statusCode || 500;
  console.error("❌ [ERROR]", err.message);

  res.status(status).json({
    status: "error",
    error: {
      code: status,
      message: err.message || "Unknown error",
    },
  });
};
