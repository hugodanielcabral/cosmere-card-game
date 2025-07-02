import { Request, Response,NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: CustomError,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err.message);

  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
};
