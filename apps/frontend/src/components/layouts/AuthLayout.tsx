import { Outlet } from "react-router";
import { Navbar } from "../Navbar";

export const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
