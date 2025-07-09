import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";
import type { RegisterFormData } from "../../features/auth/types/Register";
import type { IValidationError } from "../../types/ValidationError";

interface AuthProviderProps {
  children: ReactNode;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authError, setAuthError] = useState<IValidationError | null>(null);

  const signup = async (
    values: RegisterFormData
  ): Promise<{ message: string } | null> => {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAuthError(errorData);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      const networkError: IValidationError = {
        message:
          error instanceof Error ? error.message : "Network error occurred",
        status: "error",
      };
      setAuthError(networkError);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ signup, authError, setAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};
