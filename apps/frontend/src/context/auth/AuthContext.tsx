import { createContext } from "react";
import type { IValidationError } from "../../types/ValidationError";
import type { ILoginInput } from "../../features/auth/components/login/LoginForm";
import type { IAuthUser, ISignin } from "../../features/auth/types/Login";
import type { ISignup } from "../../features/auth/types/Register";

export interface AuthContextType {
  signup: (values: ISignup) => Promise<{ message: string } | null>;
  signin: (values: ILoginInput) => Promise<ISignin | null>;
  logout: () => void;
  user: IAuthUser | null;
  isCheckingAuth: boolean;
  authError: IValidationError | null;
  setAuthError: (error: IValidationError | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
