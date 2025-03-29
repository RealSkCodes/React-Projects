import { Outlet } from "react-router";
import Sidebar from "./shared/layout/Sidebar.jsx";
import LlmSidebar from "./shared/layout/LlmSidebar.jsx";

function App() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <Outlet />
      <LlmSidebar />
    </div>
  );
}

export default App;
