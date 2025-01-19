import React, { useState } from "react"
import { HamburgerMenuContext } from "./AppContexts.js"

const HamburgerMenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <HamburgerMenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </HamburgerMenuContext.Provider>
  )
}

export default HamburgerMenuProvider
