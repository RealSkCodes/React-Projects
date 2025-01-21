import { useContext } from "react"
import Button from "./Button.jsx"
import { JobSidebarToggleContext } from "../utils/AppContexts.js"

const JobSidebar = () => {
  const { isOpen, setIsOpen, jobData, setJobData } = useContext(JobSidebarToggleContext)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`
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
        </div>
      )}
    </>
  )
}
// Click on any card -> pass the data and set to a Context and visible JobsSidebarView div using another Context -> show the data at right side ->
// add a close button(use that context to close JobsSidebar div)
export default JobSidebar
