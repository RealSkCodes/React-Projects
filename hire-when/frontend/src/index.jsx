import App from "./App.jsx"
import Body from "./components/Body.jsx"
import HireAI from "./components/HireAI.jsx"
import Schedule from "./components/Schedule.jsx"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"
import JobsDataProvider from "./utils/JobsDataProvider.jsx"

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <JobsDataProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Body />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/hireai" element={<HireAI />} />
        </Route>
      </Routes>
    </JobsDataProvider>
  </BrowserRouter>
)
