import { CustomJWTPayload } from '../middlewares/auth.middleware';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      }
    }
  }
}