import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

// Middleware like Auth checker component
const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // console.log(auth);
    if (auth !== undefined) {
      setIsCheckingAuth(false);
    }
  }, [auth]);

  if (isCheckingAuth) return <p className="text-text">Checking authentication...</p>;

  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
