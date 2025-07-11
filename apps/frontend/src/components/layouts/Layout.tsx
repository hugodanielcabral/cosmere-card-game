import { Outlet } from "react-router";
import { Navbar } from "../navbar/Navbar";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
