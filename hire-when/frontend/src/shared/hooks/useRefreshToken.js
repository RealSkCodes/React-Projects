import axios from "axios";
import { API_URL } from "../helpers/constants";
import useAuth from "./useAuth.js";

const axiosNormal = axios.create({
  baseURL: API_URL,
});

// To refresh with latest accessToken expired
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    // Update old accessToken with new by verifying refreshToken
    const response = await axiosNormal.get(`/api/refresh`, {
      withCredentials: true,
    });
    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data);
      return { ...prev, userId: response?.data?.user_id, username: response.data.username, email: response.data.email, accessToken: response.data.access_token };
    });
    return response.data.access_token;
  };
  return refresh;
};

export default useRefreshToken;
