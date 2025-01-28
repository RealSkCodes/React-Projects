import { useState, useContext, useEffect } from "react"
import Button from "./Button.jsx"
import { JobSidebarToggleContext } from "../utils/AppContexts.js"
import JobEntry from "./JobEntry.jsx"

const JobSidebar = () => {
  const { isOpen, setIsOpen, jobData, setJobData } = useContext(JobSidebarToggleContext)
  // console.log(jobData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({})
  useEffect(() => {
    setFormData({
      company: jobData.company || "",
      role: jobData.role || "",
      area: jobData.area || "",
      posted_on: formatDateToISO8601(jobData.posted_on) || "",
      submission_date: formatDateToISO8601(jobData.submission_date) || "",
      salary: jobData.salary || "",
      status: jobData.status || "",
      source: jobData.source || "",
    })
  }, [isDialogOpen])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`
  }
  const formatDateToISO8601 = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <>
      {isOpen && (
        <div className="h-screen w-[450px] p-6 bg-background_2 text-text border-l border-border text-sm fixed top-0 right-0 shadow-lg z-50">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Job Overview</h1>
            <Button
              className="text-2xl text-text hover:text-secoundary bg-background text-right"
              onClick={() => setIsOpen(false)}
            >
              ❌
            </Button>
          </div>
          <div className="w-full p-4 bg-background rounded-lg shadow-md space-y-6">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl font-semibold">{jobData.company}</h1>
                <h2 className="text-blue-400 text-sm">{jobData.role}</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-text">
              <div>
                <h3 className="text-sm font-bold">Status</h3>
                <p className="text-gray-400">{jobData.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold">Area</h3>
                <p className="text-gray-400">{jobData.area}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold">Posted Date</h3>
                <p className="text-gray-400">{formatDate(jobData.posted_on)}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold">Submission Date</h3>
                <p className="text-gray-400">{formatDate(jobData.submission_date)}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold">Salary</h3>
                <p className="text-gray-400">{jobData.salary}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold">Source</h3>
                <p className="text-blue-400 cursor-pointer">{jobData.source}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold">Notes</h3>
              <p className="text-gray-400">Excited about the team and product vision.</p>
            </div>
          </div>
          <Button
            className="px-3 py-2 mt-3 bg-accent text-black border-none font-medium"
            onClick={() => setIsDialogOpen(!isDialogOpen)}
          >
            Edit
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Button>
          {isDialogOpen && (
            <div
              className="fixed inset-0 z-20 bg-black opacity-50 cursor-pointer"
              onClick={() => setIsDialogOpen(false)}
              aria-hidden="true"
            ></div>
          )}
          <dialog className="z-30 rounded-lg" open={isDialogOpen}>
            <JobEntry
              setIsDialogOpen={setIsDialogOpen}
              formData={formData}
              setFormData={setFormData}
              jobId={jobData.id}
            />
          </dialog>
        </div>
      )}
    </>
  )
}
// Click on any card -> pass the data and set to a Context and visible JobsSidebarView div using another Context -> show the data at right side ->
// add a close button(use that context to close JobsSidebar div)
export default JobSidebar
