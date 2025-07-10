import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface CustomJWTPayload extends JwtPayload {
  id: number;
}

export const verifyToken = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const token = req.headers.cookie?.slice(6); // slice the "token="
  console.log(token);
  if (!token) {
    throw new AppError('Access denied. Invalid Token.', 401);
  }
  const jwtSecret = process.env.TOKEN_SECRET;

  try {
    const decoded = jwt.verify(token, jwtSecret) as CustomJWTPayload;
    req.user = {
      id: decoded.id
    };
    next();
  } catch(error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token.', 401));
    } else if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError('Token verification failed.', 401));
    }
  }
};
