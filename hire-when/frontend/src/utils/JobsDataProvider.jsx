// JobsDataProvider.js
import React, { useEffect, useState } from "react"
import JobsDataContext from "./JobsDataContext"

const JobsDataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "Google",
      role: "Front-end dev",
      area: "Mumbai",
      posted: "25th Dec, 2024",
      submission: "29th Dec, 2024",
      status: "Pending",
      source: "https://google.com",
    },
  ])

  useEffect(() => {
    const fetchJobsData = async () => {
      const data = await fetch("http://localhost:3000/jobs")
      const json = await data.json()
      setJobs(json)
    }
    fetchJobsData()
  }, [])

  return <JobsDataContext.Provider value={{ jobs, setJobs }}>{children}</JobsDataContext.Provider>
}

export default JobsDataProvider
