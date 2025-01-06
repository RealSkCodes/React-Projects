import App from "./App.jsx"
import Body from "./components/Body.jsx"
import HireAI from "./components/HireAI.jsx"
import Schedule from "./components/Schedule.jsx"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Body />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/hireai" element={<HireAI />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
