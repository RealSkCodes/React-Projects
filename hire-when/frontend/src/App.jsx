import { Outlet } from "react-router"
import Header from "./components/Header.jsx"
import Sidebar from "./components/Sidebar.jsx"
import Body from "./components/Body.jsx"
import LlmSidebar from "./components/LlmSidebar.jsx"

function App() {
  return (
    <>
      {/* <Header /> */}
      <div className="flex w-full">
        <Sidebar />
        <Outlet />
        <LlmSidebar />
      </div>
    </>
  )
}

export default App
