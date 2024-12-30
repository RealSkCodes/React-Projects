import { NavLink } from "react-router"

const Navlist = () => {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Github", href: "/github" },
  ]

  return (
    <ul className="flex flex-wrap">
      {navItems.map((item) => {
        return (
          <li
            className="text-white font-bold text-lg list-none mx-4 hover:text-gray-400"
            key={item.name}
          >
            <NavLink
              to={item.href}
              className={({ isActive }) => (isActive ? "text-orange-400" : "text-green-950")}
            >
              {item.name}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}

export default Navlist
