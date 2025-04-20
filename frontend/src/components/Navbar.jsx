import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import daisyuiThemes from "../constants/daisyuiThemes";
import { themeStore } from "../store/themeStore";
import { authStore } from "../store/authStore";

const Navbar = () => {
  const { setTheme } = themeStore();
  const { logout, authUser } = authStore();

  const handleLogout = () => {
    logout();
  };
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
  backdrop-blur-lg "
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <h1>
            <Link to={"/"} className="hover:opacity-80 transition-all">
              <img
                src="https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5"
                alt="Etherscan logo"
                className="size-40"
              />
            </Link>
          </h1>
          <div className="flex items-center gap-2  ">
            {authUser && (
              <button
                onClick={handleLogout}
                className="  btn btn-sm gap-2 transition-colors"
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline text-base font-semibold">
                  Logout
                </span>
              </button>
            )}
            {/* Change theme button */}

            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-sm">
                <div className="bg-base-100 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1">
                  <div className="bg-base-content size-1.5 rounded-full"></div>
                  <div className="bg-primary size-1.5 rounded-full"></div>
                  <div className="bg-secondary  size-1.5 rounded-full"></div>
                  <div className="bg-accent  size-1.5 rounded-full"></div>
                </div>
                <svg
                  width="12px"
                  height="12px"
                  className="inline-block h-2 w-2 fill-current opacity-60"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl max-h-[300px] overflow-y-auto overflow-x-hidden"
              >
                <p className="menu-title text-md mb-3">Theme</p>
                {daisyuiThemes.map((theme, i) => (
                  <li
                    onClick={() => setTheme(theme)}
                    key={i}
                    className="cursor-pointer hover:opacity-90 flex justify-center items-center ml-4 "
                  >
                    <div
                      className="bg-base-100 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 group-hover:opacity-70 transition-all"
                      data-theme={theme}
                    >
                      <div className="bg-base-content size-1.5 rounded-full"></div>
                      <div className="bg-primary size-1.5 rounded-full"></div>
                      <div className="bg-secondary  size-1.5 rounded-full"></div>
                      <div className="bg-accent  size-1.5 rounded-full"></div>
                    </div>
                    <input
                      type="radio"
                      name="theme-dropdown"
                      className=" w-full btn btn-sm btn-block btn-ghost justify-start text-lg"
                      aria-label={theme}
                      value={theme}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
