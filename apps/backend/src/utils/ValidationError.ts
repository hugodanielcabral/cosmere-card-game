import { AppError } from './AppError';

export class ValidationError extends AppError {
  details: string;
  constructor(message:string, details:string) {
    super(message, 400);
    this.details = details;
  }
}
