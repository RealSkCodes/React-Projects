import SearchBar from "./SearchBar.jsx"
import { useContext } from "react"
import { HamburgerMenuContext } from "../utils/AppContexts.js"

const Header = () => {
  const { isOpen, toggleMenu } = useContext(HamburgerMenuContext)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 items-center p-2 bg-background border-b-[1px] border-border">
      {/* Left Section: Hamburger Menu and Logo */}
      <div className="flex items-center">
        <img
          onClick={() => toggleMenu()}
          className="max-w-5 sm:max-w-7 rounded-md bg-black cursor-pointer"
          src="./assets/images/icons8-menu-120.png"
          alt="hamburger button"
        />
        <img className="max-h-8 sm:max-h-12 mx-2 mb-3" src="./assets/icons/logo2.png" alt="logo" />
      </div>

      {/* Middle Section: Search Bar */}
      <SearchBar
        btnName="Search"
        containerStyle="md:flex justify-center hidden w-full max-w-[450px] mx-auto"
        inpStyle="w-full px-4 py-[5px] rounded-l-[50px] border-[1px] border-border bg-background text-text font-medium mr-0"
        btnStyle="px-4 py-[7px] ml-[-2px] rounded-r-[50px] border-none bg-primary text-text font-semibold"
      />
      {/* Right Section: User Logo */}
      <div className="flex justify-end">
        <img
          className="w-12 sm:w-16 cursor-pointer"
          src="./assets/images/user-logo.png"
          alt="user logo"
        />
      </div>
    </div>
  )
}

export default Header
