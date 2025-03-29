import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken.js";
import axios from "axios";
import { API_URL } from "../helpers/constants.js";

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    // Attaches the access token to every outgoing request
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      // If the response is good then return it
      (response) => response,
      // If response bad then do this
      async (error) => {
        const prevRequest = error?.config;
        // If there is a error status and previous request doesn't have sent property then
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh(); // Get the new access_token
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          // Making the request again with new access_token
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      // Cleanup the interceptors
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
