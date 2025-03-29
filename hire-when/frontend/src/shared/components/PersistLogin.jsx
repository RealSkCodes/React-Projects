import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

// Logic to keep user logged in (if refresh token isnt expired)
const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const verifyRefreshToken = async () => {
    try {
      await refresh(); // Fill auth state with new access_token
    } catch (err) {
      console.log(err?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // Upon visiting website it will get new access token if not found
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);
  // useEffect(() => {
  // console.log(`isLoading: ${isLoading}`);
  // console.log(`Access Token: ${JSON.stringify(auth?.accessToken)}`);
  // }, [isLoading]);
  return <>{!persist ? <Outlet /> : isLoading ? <p className="text-text">Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
