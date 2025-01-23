import App from "./App.jsx"
import Body from "./components/Body.jsx"
import HireAI from "./components/HireAI.jsx"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"
import AppContextsProvider from "./utils/AppContextsProvider.jsx"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextsProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Body />} />
          <Route path="/hireai" element={<HireAI />} />
        </Route>
      </Routes>
    </AppContextsProvider>
  </BrowserRouter>
)
