import { NavLink, useHref } from "react-router";
import Button from "../../shared/components/Button.jsx";
import HomeIcon from "../assets/icons/HomeIcon.jsx";
import GraphIcon from "../assets/icons/GraphIcon.jsx";
import AboutIcon from "../assets/icons/AboutIcon.jsx";
import { useContext } from "react";
import { HamburgerMenuContext } from "../../shared/contexts/AppContexts.js";
import useLogout from "../hooks/useLogout.js";
import useAuth from "../hooks/useAuth.js";

const Sidebar = () => {
  const logout = useLogout();
  const pathName = useHref();
  const { auth } = useAuth();
  const { isSidebarOpen, setIsSidebarOpenToggle } = useContext(HamburgerMenuContext);

  return (
    <>
      {isSidebarOpen && (
        <div className="h-screen max-w-[180px] lg:min-w-[230px] lg:static bg-background_2 border-r border-border shadow-lg text-text absolute flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex justify-center items-center gap-3">
              <img className="max-h-10 lg:max-h-12 ml-3 mr-auto my-2" src="./assets/icons/logo2.png" alt="logo" />
              <img onClick={() => setIsSidebarOpenToggle()} className="max-w-5 sm:max-w-7 mt-3 rounded-md bg-transparent cursor-pointer lg:hidden mr-2" src="./assets/images/icons8-menu-120.png" alt="hamburger button" />
            </div>
            <ul className="flex flex-col">
              <NavLink to="/" className={`flex items-center px-4 py-3 mt-4 mx-3 mr-10 rounded-md cursor-pointer hover:scale-105 ${pathName === "/" && "bg-secondary"}`}>
                <HomeIcon />
                <span className="ml-3 font-medium text-md">Home</span>
              </NavLink>
              <NavLink to="/analytics" className={`flex items-center px-4 py-3 mt-4 mx-3 mr-10 rounded-md cursor-pointer hover:scale-105 ${pathName === "/analytics" && "bg-secondary"}`}>
                <GraphIcon />
                <span className="ml-3 font-medium text-md">Analytics</span>
              </NavLink>
              <NavLink to="#" className={`flex items-center px-4 py-3 mt-4 mx-3 mr-10 rounded-md cursor-pointer hover:scale-105 ${pathName === "#" && "bg-secondary"}`}>
                <AboutIcon />
                <span className="ml-3 font-medium text-md">About</span>
              </NavLink>
            </ul>
          </div>
          <div className="p-4">
            <div className="bg-gradient-to-br from-background_2 to-background border border-border rounded-lg p-4 text-center">
              <h2 className="font-medium truncate">{auth?.username}</h2>
              <p className="text-sm text-text/70 truncate">{auth?.email}</p>
              <Button className="mt-4 mx-auto w-min px-3 py-1 bg-red-500 hover:bg-red-600 text-white" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
