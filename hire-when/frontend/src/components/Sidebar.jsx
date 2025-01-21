import { NavLink } from "react-router"
import { useContext } from "react"
import { HamburgerMenuContext } from "../utils/AppContexts.js"

const Sidebar = () => {
  const { isOpen, setIsOpen } = useContext(HamburgerMenuContext)
  return (
    <>
      {isOpen && (
        <div className="h-screen max-w-[180px] text-xs sm:text-xs md:text-base lg:min-w-[230px] lg:static bg-background_2 border-r border-border shadow-lg text-text absolute flex">
          <ul className="flex flex-col px-4">
            <NavLink
              to="/"
              className="flex items-center px-4 py-3 mt-4 rounded-md cursor-pointer hover:bg-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span className="ml-3 font-medium">Home</span>
            </NavLink>
            <NavLink
              to="/schedule"
              className="flex items-center px-4 py-3 mt-4 rounded-md cursor-pointer hover:bg-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
              <span className="ml-3 font-medium">Schedule</span>
            </NavLink>
            <NavLink
              to="/hireai"
              className="flex items-center px-4 py-3 mt-4 rounded-md cursor-pointer hover:bg-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 8V4H8"></path>
                <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                <path d="M2 14h2"></path>
                <path d="M20 14h2"></path>
                <path d="M15 13v2"></path>
                <path d="M9 13v2"></path>
              </svg>
              <span className="ml-3 font-medium">HireAI</span>
            </NavLink>
            <NavLink
              to="#"
              className="flex items-center px-4 py-3 mt-4 rounded-md cursor-pointer hover:bg-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              <span className="ml-3 font-medium">About</span>
            </NavLink>
          </ul>
        </div>
      )}
    </>
  )
}

export default Sidebar
