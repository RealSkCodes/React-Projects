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
    const handleJobAdded = () => {
      console.log("Job added event received via socket")
      fetchJobsData()
    }
    const handleJobEdited = () => {
      console.log("Job edited event received via socket")
      fetchJobsData()
    }
    const handleTodosEdited = () => {
      console.log("Todos edited event received via socket")
      fetchJobsData()
    }
    socket.on("job_added", handleJobAdded)
    socket.on("job_edited", handleJobEdited)
    socket.on("todos_edited", handleTodosEdited)
    return () => {
      socket.off("job_added", handleJobAdded)
      socket.off("job_edited", handleJobEdited)
      socket.off("todos_edited", handleTodosEdited)
    }
  }, [])

  return <JobsDataContext.Provider value={{ jobs, setJobs }}>{children}</JobsDataContext.Provider>
}

export default JobsDataProvider
