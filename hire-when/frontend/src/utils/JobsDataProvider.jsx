import React, { useEffect, useState } from "react"
import { JobsDataContext } from "./AppContexts.js"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3000")

const JobsDataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([])

  const fetchJobsData = async () => {
    try {
      const response = await fetch("http://localhost:3000/jobs")
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error("Error fetching jobs:", error)
    }
  }
  useEffect(() => {
    // Fetch jobs initially
    fetchJobsData()
    // Listen for socket messages and trigger re-fetch
    socket.on("job_added", () => {
      console.log("Job added event received via socket")
      fetchJobsData()
    })
    return () => {
      socket.off("job_added")
    }
  }, [])

  return <JobsDataContext.Provider value={{ jobs, setJobs }}>{children}</JobsDataContext.Provider>
}

export default JobsDataProvider
