import App from "./App.jsx"
import Body from "./components/Body.jsx"
import JobEntry from "./components/JobEntry.jsx"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"

const appLayout = createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Body />} />
        <Route path="/jobs" element={<JobEntry />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
