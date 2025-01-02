import SearchBar from "./SearchBar.jsx"

const Header = () => {
  return (
    <div className="bg-background grid grid-cols-3 items-center border-b-[1px] border-gray-300">
      <div className="flex items-center">
        <img
          className="w-8 rounded-md m-2 cursor-pointer "
          src="./assets/images/hamburgermenu-button.png"
          alt="hamburger button"
        />
        <img className="w-10 m-2" src="./assets/images/logo.png" alt="logo" />
        <span className="font-semibold text-3xl font-audiowide text-text my-2">HIRE WHEN</span>
      </div>
      <SearchBar
        btnName="Search"
        inpStyle="p-1 mr-0 rounded-l-[50px] border-darkPlum w-96 font-semibold"
        btnStyle="px-3 py-[6px] ml-0 rounded-r-[50px] border-none font-semibold bg-primary text-white"
      />
      <img
        className="w-16 m-2 cursor-pointer drop-shadow-[3px_3px_2px_black] ml-auto"
        src="./assets/images/user-logo.png"
        alt="user logo"
      />
    </div>
  )
}

export default Header
