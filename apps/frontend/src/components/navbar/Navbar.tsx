import { NavLink } from "react-router";
import ccgLogo from "../../assets/cosmere-logo.webp";
import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export const Navbar = () => {
  const { isCheckingAuth, user, logout } = useAuth();

  return (
    <nav className="navbar bg-primary shadow-sm justify-between">
      <Link to="/">
        <img
          src={ccgLogo}
          alt="Cosmere Card Game Logo"
          className="md:size-20 size-16 hover:scale-110 transition duration-300 delay-75 ease-in-out"
        />
      </Link>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "underline underline-offset-2 font-medium text-lg md:text-2xl"
            : "text-lg md:text-2xl"
        }
      >
        Home
      </NavLink>
      <div className="flex-none">
        {isCheckingAuth ? (
          <div className="flex items-center space-x-4">
            <div className="skeleton h-8 w-16"></div>
            <div className="skeleton h-8 w-20"></div>
          </div>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-x-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-2 font-medium text-lg md:text-2xl"
                  : "text-lg md:text-2xl"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-2 font-medium text-lg md:text-2xl"
                  : "text-lg md:text-2xl"
              }
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};
