import React, { useState } from "react"
import { HamburgerMenuContext } from "./AppContexts.js"

const HamburgerMenuProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const setIsSidebarOpenToggle = () => setIsSidebarOpen((prev) => !prev)

  return (
    <HamburgerMenuContext.Provider value={{ isSidebarOpen, setIsSidebarOpenToggle }}>
      {children}
    </HamburgerMenuContext.Provider>
  )
}

export default HamburgerMenuProvider
