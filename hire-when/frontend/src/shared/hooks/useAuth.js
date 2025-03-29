import { useContext } from "react";
import { AuthContext } from "../contexts/AppContexts.js";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
