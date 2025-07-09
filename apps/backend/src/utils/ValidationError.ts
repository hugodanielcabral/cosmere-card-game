import { AppError } from './AppError';

export class ValidationError extends AppError {
  details: string;
  field: string;
  constructor(
    message: string,
    status: number = 400,
    details: string,
    field?: string
  ) {
    super(message, status);
    this.details = details;
    this.field = field ?? '';
  }
}
