import { useContext } from "react";
import { API_URL } from "../helpers/constants";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { JobsDataContext } from "../contexts/AppContexts";

// Logic for logging out the user
const useLogout = () => {
  const { setJobsList } = useContext(JobsDataContext);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    try {
      const response = await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        navigate("/login");
        console.log("Logout Successful");
        // setJobsList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return logout;
};

export default useLogout;
