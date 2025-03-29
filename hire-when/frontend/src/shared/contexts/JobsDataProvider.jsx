import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { useLocation, useNavigate } from "react-router";
import { JobsDataContext } from "./AppContexts.js";
import useAuth from "../hooks/useAuth.js";

const JobsDataProvider = ({ children }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  // Initial jobs list state
  const [jobsList, setJobsList] = useState([]);

  useEffect(() => {
    if (!auth?.accessToken) return;

    let isMounted = true;
    const controller = new AbortController();

    const fetchJobsData = async () => {
      try {
        const response = await axiosPrivate.get("/api/get-jobs", {
          signal: controller.signal,
        });
        if (isMounted && response?.status === 200) {
          setJobsList(response?.data?.result);
          console.log(response?.data?.message);
        }
      } catch (err) {
        console.log(err);
        if (err.response?.status === 403) {
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    fetchJobsData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [auth?.accessToken]); // Only re-run when the token changes

  return <JobsDataContext.Provider value={{ jobsList, setJobsList }}>{children}</JobsDataContext.Provider>;
};

export default JobsDataProvider;
