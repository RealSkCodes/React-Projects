import Button from "./Button.jsx"
import JobEntry from "./JobEntry.jsx"
import JobsCard from "./JobsCard.jsx"
import Dropdown from "./Dropdown.jsx"
import { useState, useEffect, useContext } from "react"
import { JobsDataContext } from "../utils/AppContexts.js"
import { JobSidebarToggleContext } from "../utils/AppContexts.js"

const Body = () => {
  const { jobs } = useContext(JobsDataContext)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { isOpen, setIsOpen, jobData, setJobData } = useContext(JobSidebarToggleContext)
  useEffect(() => {
    return () => {
      setIsOpen(false)
      setJobData(null)
    }
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`
  }

  // Filter functions
  const [filteredJobs, setFilteredJobs] = useState([])
  // Date filter
  const handleDateFilterChange = (value) => {}
  // Status filter
  useEffect(() => {
    setFilteredJobs(jobs)
  }, [jobs])
  const handleStatusFilterChange = (value) => {
    if (value === "All") {
      setFilteredJobs(jobs)
    } else {
      const filteredJob = jobs.filter((job) => job.status.toLowerCase() === value.toLowerCase())
      setFilteredJobs(filteredJob)
    }
  }

  return (
    <div className="w-full h-screen p-4 bg-background">
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 cursor-pointer"
          onClick={() => setIsDialogOpen(false)}
        ></div>
      )}
      <dialog className="z-30 rounded-lg" open={isDialogOpen}>
        <JobEntry setIsDialogOpen={setIsDialogOpen} />
      </dialog>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl text-text font-bold font-geist">Overview</h1>
        <div className="flex items-center">
          <Dropdown
            itemsArray={[
              "Posted (Newest)",
              "Posted (Oldest)",
              "Applied (Newest)",
              "Applied (Oldest)",
            ]}
            placeholder="Date"
            dropStyle="h-9 min-w-[150px] border border-border bg-background_2 text-text"
            onSelectChange={handleDateFilterChange}
          />
          <Dropdown
            itemsArray={[
              "All",
              "Draft",
              "Applied",
              "Interview Scheduled",
              "Interview Completed",
              "Offer Received",
              "Accepted",
              "Rejected",
              "Withdrawn",
            ]}
            placeholder="Status"
            dropStyle="h-9 min-w-[150px] border border-border bg-background_2 text-text"
            onSelectChange={handleStatusFilterChange}
          />
          <Button
            className="rounded-3xl px-4 py-2 bg-primary text-gray-100 font-semibold active:bg-secoundary ml-4"
            onClick={() => setIsDialogOpen(!isDialogOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Create
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto h-[80vh]">
        {filteredJobs.map((detail) => (
          <JobsCard
            key={detail.id}
            id={detail.id}
            company={detail.company}
            area={detail.area}
            role={detail.role}
            posted_on={formatDate(detail.posted_on)}
            submission_date={formatDate(detail.submission_date)}
            status={detail.status}
            source={detail.source}
            notes={detail.notes}
            fullData={detail}
          />
        ))}
      </div>
    </div>
  )
}

export default Body
