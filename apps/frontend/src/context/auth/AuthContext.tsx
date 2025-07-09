import { createContext } from "react";
import type { RegisterFormData } from "../../features/auth/components/register/RegisterForm";
import type { IValidationError } from "../../types/ValidationError";

export interface AuthContextType {
  signup: (values: RegisterFormData) => Promise<{ message: string } | null>;
  authError: IValidationError | null;
  setAuthError: (error: IValidationError | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
