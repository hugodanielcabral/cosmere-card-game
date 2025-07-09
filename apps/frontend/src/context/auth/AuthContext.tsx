import { createContext } from "react";
import type { IAppError } from "../../types/AppError";
import type { RegisterFormData } from "../../features/auth/components/register/RegisterForm";

export interface AuthContextType {
  signup: (values: RegisterFormData) => Promise<{ message: string } | null>;
  authError: IAppError | null;
  setAuthError: (error: IAppError | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
