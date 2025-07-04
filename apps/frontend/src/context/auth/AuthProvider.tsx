import { useState } from "react";
import type { ReactNode } from "react";
import type { IAppError } from "../../types/AppError";
import type { RegisterFormData } from "../../features/auth/components/register/RegisterForm";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [error, setError] = useState<IAppError | null>(null);

  const signup = async (
    values: RegisterFormData
  ): Promise<{ message: string } | null> => {
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      const networkError: IAppError = {
        message:
          error instanceof Error ? error.message : "Network error occurred",
        status: "error",
      };
      setError(networkError);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ signup, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
