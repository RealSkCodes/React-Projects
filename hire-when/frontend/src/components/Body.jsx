import Button from "./Button.jsx"
import JobEntry from "./JobEntry.jsx"
import { useState, useContext } from "react"
import JobsDataContext from "../utils/JobsDataContext.js"

const Body = () => {
  const { jobs } = useContext(JobsDataContext)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`
  }

  return (
    <div className="w-full h-full p-4 bg-background">
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 cursor-pointer"
          onClick={() => setIsDialogOpen(false)}
        ></div>
      )}
      <dialog className="z-30 rounded-lg" open={isDialogOpen}>
        <JobEntry setIsDialogOpen={setIsDialogOpen} />
      </dialog>
      <div className="flex justify-between items-center">
        <h1 className="mb-3 text-2xl text-text font-bold font-geist">Overview</h1>
        <Button
          name="Create"
          addStyle="rounded-3xl px-4 py-2 bg-primary text-gray-100 font-semibold active:bg-secoundary"
          onclick={() => setIsDialogOpen(!isDialogOpen)}
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
        </Button>
      </div>
      <div className="grid grid-cols-12 text-center font-audiowide bg-primary text-text rounded-lg shadow-[3px_3px_8px_0px_rgba(0,0,0,0.8)] mb-2 border-2 border-blue-700">
        <span className="py-2 col-span-1">Company</span>
        <span className="py-2 col-span-2">Role</span>
        <span className="py-2 col-span-1">Area</span>
        <span className="py-2 col-span-2">Posted On</span>
        <span className="py-2 col-span-2">Submission Date</span>
        <span className="py-2 col-span-2">Status</span>
        <span className="py-2 col-span-2">Source</span>
      </div>
      <div className="h-[78vh] overflow-y-auto border-[1px] border-border rounded-lg">
        {jobs.map((detail) => (
          <div
            className="grid grid-cols-12 text-center bg-background_2 text-text font-geist font-normal hover:bg-slate-800"
            key={detail.id}
          >
            <span className="col-span-1 py-4 border-b-[1px] border-border">{detail.company}</span>
            <span className="col-span-2 py-4 border-b-[1px] border-border">{detail.role}</span>
            <span className="col-span-1 py-4 border-b-[1px] border-border">{detail.area}</span>
            <span className="col-span-2 py-4 border-b-[1px] border-border">
              {formatDate(detail.posted_on)}
            </span>
            <span className="col-span-2 py-4 border-b-[1px] border-border">
              {formatDate(detail.submission_date)}
            </span>
            <span className="col-span-2 py-4 border-b-[1px] border-border">{detail.status}</span>
            <span className="col-span-2 py-4 border-b-[1px] border-border">{detail.source}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Body
