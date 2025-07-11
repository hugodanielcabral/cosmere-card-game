import { Outlet } from "react-router";
import { Navbar } from "../navbar/Navbar";

export const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
