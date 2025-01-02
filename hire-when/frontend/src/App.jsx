import { Outlet } from "react-router"
import Header from "./components/Header.jsx"
import Sidebar from "./components/Sidebar.jsx"
import Body from "./components/Body.jsx"
import LlmSidebar from "./components/LlmSidebar.jsx"

function App() {
  return (
    <div className="">
      <Header />
      <div className="flex w-dvw">
        <Sidebar />
        <Outlet />
        <LlmSidebar />
      </div>
    </div>
  )
}

export default App
