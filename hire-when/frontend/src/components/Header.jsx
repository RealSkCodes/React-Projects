import SearchBar from "./SearchBar.jsx"

const Header = () => {
  return (
    <div className="bg-fuchsia-100 flex justify-between items-center border-b-[1px] border-purple-800 shadow-lg">
      <div className="flex items-center">
        <img
          className="w-8 rounded-md m-2 cursor-pointer"
          src="./assets/images/hamburgermenu-button.png"
          alt="hamburger button"
        />
        <img className="w-10 m-2" src="./assets/images/logo.png" alt="logo" />
        <span className="font-semibold text-3xl font-audiowide text-pink-300 drop-shadow-[3px_3px_2px_purple] my-2">
          HIRE WHEN
        </span>
      </div>
      <SearchBar
        btnName="Search"
        inpStyle="p-1 mr-0 rounded-l-[50px] border-purple-900 w-96 font-semibold"
        btnStyle="p-1 ml-0 rounded-r-[50px] border-purple-900 font-semibold bg-gray-300"
      />
      <img
        className="w-16 m-2 cursor-pointer"
        src="./assets/images/user-logo.png"
        alt="user logo"
      />
    </div>
  )
}

export default Header
