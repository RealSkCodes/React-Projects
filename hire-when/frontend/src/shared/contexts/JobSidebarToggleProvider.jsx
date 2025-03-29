import { useState } from "react";
import { JobSidebarToggleContext } from "./AppContexts.js";

const JobSidebarToggleProvider = ({ children }) => {
  const [isJobSidebarOpen, setIsJobSidebarOpen] = useState(false);
  const [jobDataSidebar, setJobDataSidebar] = useState({});

  return <JobSidebarToggleContext.Provider value={{ isJobSidebarOpen, setIsJobSidebarOpen, jobDataSidebar, setJobDataSidebar }}>{children}</JobSidebarToggleContext.Provider>;
};

export default JobSidebarToggleProvider;
