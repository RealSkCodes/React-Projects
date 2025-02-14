import { Outlet, useLocation } from "react-router"
import Header from "./components/Header.jsx"
import Sidebar from "./components/Sidebar.jsx"
import Body from "./components/Body.jsx"
import LlmSidebar from "./components/LlmSidebar.jsx"

function App() {
  const { pathname } = useLocation()
  return (
    <>
      <Header />
      <div className="flex w-full">
        <Sidebar />
        <Outlet />
        {pathname === "/hireai" ? null : <LlmSidebar />}
      </div>
    </>
  )
}

export default App
