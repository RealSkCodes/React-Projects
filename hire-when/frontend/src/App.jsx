import { Outlet } from "react-router"
import Sidebar from "./components/Sidebar.jsx"
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
