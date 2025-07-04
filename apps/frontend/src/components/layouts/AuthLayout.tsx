import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="max-h-screen flex justify-center mt-5">
      <Outlet />
    </div>
  );
};
