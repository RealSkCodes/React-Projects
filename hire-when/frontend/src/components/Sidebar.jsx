import { NavLink, useHref } from "react-router"
import Button from "./Button.jsx"
import { useContext } from "react"
import { HamburgerMenuContext } from "../utils/AppContexts.js"

const Sidebar = () => {
	const pathName = useHref()
	const { isSidebarOpen, setIsSidebarOpenToggle } =
		useContext(HamburgerMenuContext)
	return (
		<>
			{isSidebarOpen && (
				<div className="h-screen max-w-[180px] lg:min-w-[230px] lg:static bg-background_2 border-r border-border shadow-lg text-text absolute flex flex-col justify-between">
					<div className="flex flex-col gap-2">
						<div className="flex justify-center items-center gap-3">
							<img
								className="max-h-10 lg:max-h-12 ml-3 mr-auto my-2"
								src="./assets/icons/logo2.png"
								alt="logo"
							/>
							<img
								onClick={() => setIsSidebarOpenToggle()}
								className="max-w-5 sm:max-w-7 mt-3 rounded-md bg-transparent cursor-pointer lg:hidden mr-2"
								src="./assets/images/icons8-menu-120.png"
								alt="hamburger button"
							/>
						</div>
						<ul className="flex flex-col">
							<NavLink
								to="/"
								className={`flex items-center px-4 py-3 mt-4 mx-3 mr-10 rounded-md cursor-pointer hover:scale-105 ${
									pathName === "/" && "bg-secondary"
								}`}
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
								<span className="ml-3 font-medium text-md">Home</span>
							</NavLink>
							<NavLink
								to="/analytics"
								className={`flex items-center px-4 py-3 mt-4 mx-3 mr-10 rounded-md cursor-pointer hover:scale-105 ${
									pathName === "/analytics" && "bg-secondary"
								}`}
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
									<path d="M3 3v18h18"></path>
									<rect x="7" y="10" width="4" height="8" rx="1"></rect>
									<rect x="15" y="6" width="4" height="12" rx="1"></rect>
								</svg>
								<span className="ml-3 font-medium text-md">Analytics</span>
							</NavLink>
							<NavLink
								to="#"
								className={`flex items-center px-4 py-3 mt-4 mx-3 mr-10 rounded-md cursor-pointer hover:scale-105 ${
									pathName === "#" && "bg-secondary"
								}`}
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
									<line x1="12" y1="16" x2="12" y2="12"></line>
									<line x1="12" y1="8" x2="12.01" y2="8"></line>
								</svg>
								<span className="ml-3 font-medium text-md">About</span>
							</NavLink>
							<NavLink
								to="#"
								className={`flex items-center px-4 py-3 mt-4 mx-3 mr-10 rounded-md cursor-pointer hover:scale-105 ${
									pathName === "#" && "bg-secondary"
								}`}
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
									<line x1="12" y1="16" x2="12" y2="12"></line>
									<line x1="12" y1="8" x2="12.01" y2="8"></line>
								</svg>
								<span className="ml-3 font-medium text-md">About</span>
							</NavLink>
						</ul>
					</div>
					<div className="p-4">
						<div className="bg-gradient-to-br from-background_2 to-background border border-border rounded-lg p-4 text-center">
							<h2 className="font-medium truncate">Sk Earfun Uddin</h2>
							<p className="text-sm text-text/70 truncate">
								realsk1234@gmail.com
							</p>
							<Button
								className="mt-4 mx-auto w-min px-3 py-1 bg-red-500 hover:bg-red-600 text-white"
								onClick={() => console.log("Logout clicked")}
							>
								Logout
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Sidebar
