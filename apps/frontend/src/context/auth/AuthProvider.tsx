import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";
import type { IValidationError } from "../../types/ValidationError";
import type { ILoginInput } from "../../features/auth/components/login/LoginForm";
import type { IAuthUser, ISignin } from "../../features/auth/types/Login";
import type { ISignup } from "../../features/auth/types/Register";

interface AuthProviderProps {
  children: ReactNode;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authError, setAuthError] = useState<IValidationError | null>(null);
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = await getToken();

        if (storedToken) {
          await profile();
        }
      } catch (err) {
        console.error("Error checking auth:", err);
        setUser(null);
        setToken(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const getToken = async () => {
    try {
      const tokenCookie = await cookieStore.get("token");
      const tokenValue = tokenCookie?.value || null;

      setToken(tokenValue);
      return tokenValue;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  const signup = async (
    values: ISignup
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

  const signin = async (values: ILoginInput): Promise<ISignin | null> => {
    try {
      const response = await fetch(`${BASE_URL}/signin`, {
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

      const newUser = {
        user_id: data.user_id,
        username: data.username,
      };
      const newToken = data.token;

      setUser(newUser);
      setToken(newToken);

      await cookieStore.set({
        name: "token",
        value: newToken,
        expires: Date.now() + 86400 * 1000,
      });

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

  const profile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/profile`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAuthError(errorData);
        setUser(null);
        setToken(null);
        await cookieStore.delete("token");
        return null;
      }

      const data = await response.json();

      const newUser = {
        user_id: data.user_id,
        username: data.username,
      };

      setUser(newUser);
      return data;
    } catch (error) {
      const networkError: IValidationError = {
        message:
          error instanceof Error ? error.message : "Network error occurred",
        status: "error",
      };
      setAuthError(networkError);
      setUser(null);
      setToken(null);
      return null;
    }
  };

  const logout = async () => {
    try {
      await cookieStore.delete("token");
      setUser(null);
      setToken(null);
      setAuthError(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isCheckingAuth,
        authError,
        setAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
