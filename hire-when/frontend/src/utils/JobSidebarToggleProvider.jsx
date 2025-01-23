import { useState } from "react"
import { JobSidebarToggleContext } from "./AppContexts.js"

const JobSidebarToggleProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [jobData, setJobData] = useState({})

  return (
    <JobSidebarToggleContext.Provider value={{ isOpen, setIsOpen, jobData, setJobData }}>
      {children}
    </JobSidebarToggleContext.Provider>
  )
}

export default JobSidebarToggleProvider
