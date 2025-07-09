import type { IAppError } from "./AppError";

export interface IValidationError extends IAppError {
  details?: string;
  field?: string;
}
