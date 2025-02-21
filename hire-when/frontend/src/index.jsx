import App from "./App.jsx"
import Body from "./components/Body.jsx"
import Analytics from "./components/Analytics.jsx"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"
import AppContextsProvider from "./utils/AppContextsProvider.jsx"
import Signup from "./components/Signup.jsx"
import Login from "./components/Login.jsx"

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AppContextsProvider>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/" element={<Body />} />
					<Route path="/analytics" element={<Analytics />} />
				</Route>
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</AppContextsProvider>
	</BrowserRouter>
)
