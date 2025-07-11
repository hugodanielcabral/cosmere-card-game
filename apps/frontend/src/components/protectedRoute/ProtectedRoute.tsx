import { Navigate, Outlet } from "react-router";
import type { IAuthUser } from "../../features/auth/types/Login";

type ProtectedRouteProps = {
  user: IAuthUser | null;
  redirectPath?: string;
  children?: React.ReactNode;
};

export const ProtectedRoute = ({
  user,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
