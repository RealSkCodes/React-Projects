import SearchBar from "./SearchBar.jsx"
import { useContext } from "react"
import { HamburgerMenuContext } from "../utils/AppContexts.js"

const Header = () => {
  const { isOpen, toggleMenu } = useContext(HamburgerMenuContext)
  return (
    <div className="grid grid-cols-3 items-center bg-background border-b-[1px] border-border">
      <div className="flex items-center">
        <img
          onClick={() => toggleMenu()}
          className="w-7 m-2 rounded-md bg-black cursor-pointer"
          src="./assets/images/icons8-menu-120.png"
          alt="hamburger button"
        />
        <img className="h-12 mx-2 mb-3" src="./assets/icons/logo2.png" alt="logo" />
      </div>
      <SearchBar
        btnName="Search"
        inpStyle="w-96 px-4 py-[5px] rounded-l-[50px] border-[1px] border-border bg-background text-text font-medium mr-0"
        btnStyle="px-4 py-[7px] ml-[-2px] rounded-r-[50px] border-none bg-primary text-text font-semibold"
      />
      <img
        className="w-16 m-2 ml-auto cursor-pointer"
        src="./assets/images/user-logo.png"
        alt="user logo"
      />
    </div>
  )
}

export default Header
