import { useContext } from "react"
import { NavLink } from "react-router"
import LOGO from "../../assets/images/eat-more-logo.png"
import Navlist from "./Navlist.jsx"
import { CartContext } from "../utils/useCartContext.js"

const Header = () => {
  const { cart } = useContext(CartContext)
  return (
    <div className="flex items-center justify-between my-3 p-2 w-4/5 mx-auto sticky top-0 z-50 bg-gray-900 border-[1px] border-gray-600 rounded-lg shadow-[5px_5px_10px_3px_#141414]">
      <div className="flex items-center">
        <img src={LOGO} className="w-11 mx-2" alt="eat more logo" />
        <span className="text-orange-300 font-extrabold text-2xl mx-2">EAT MORE</span>
      </div>
      <Navlist />
      <NavLink to={"/cart"}>
        <span className="text-white bg-gray-800 px-3 py-1 rounded-lg shadow-lg font-bold">
          Cart: {cart.reduce((preValue, curValue) => preValue + curValue.quantity, 0)}
        </span>
      </NavLink>
    </div>
  )
}

export default Header
