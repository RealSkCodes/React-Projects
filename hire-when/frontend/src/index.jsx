import App from "./App.jsx";
import Body from "./features/dashboard/components/Body.jsx";
import Analytics from "./features/analytics/components/Analytics.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import AppContextsProvider from "./shared/contexts/AppContextsProvider.jsx";
import Signup from "./features/auth/components/Signup.jsx";
import Login from "./features/auth/components/Login.jsx";
import RequireAuth from "./shared/components/RequireAuth.jsx";
import PersistLogin from "./shared/components/PersistLogin.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextsProvider>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Body />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
          </Route>
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AppContextsProvider>
  </BrowserRouter>,
);
