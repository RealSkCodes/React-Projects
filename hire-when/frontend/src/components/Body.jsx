import Button from "./Button.jsx"
import JobEntry from "./JobEntry.jsx"
import { useState, useContext } from "react"
import JobsDataContext from "../utils/JobsDataContext.js"

const Body = () => {
  // Get the jobs data from context api
  const { jobs } = useContext(JobsDataContext)
  // Modal dialog open/close state
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="w-full p-4 bg-background">
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 cursor-pointer"
          onClick={() => setIsDialogOpen(false)}
        ></div>
      )}
      <dialog className="z-30 rounded-lg" open={isDialogOpen}>
        <JobEntry setIsDialogOpen={setIsDialogOpen} />
      </dialog>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl text-text mb-3 font-notosans">Overview</h1>
        <Button
          name="Create ➕"
          addStyle="bg-primary px-4 py-2 text-gray-100 font-semibold rounded-xl shadow-xl hover:scale-105 hover:bg-accent active:bg-primary"
          onclick={() => setIsDialogOpen(!isDialogOpen)}
        />
      </div>
      <div className="grid grid-cols-12 text-center font-audiowide bg-accent text-gray-100 rounded-lg shadow-[3px_3px_8px_0px_rgba(0,0,0,0.8)] mb-2 border-gray-200 border-2">
        <span className="border-r-2 border-gray-100 py-2 col-span-1">Company</span>
        <span className="border-r-2 border-gray-100 py-2 col-span-2">Role</span>
        <span className="border-r-2 border-gray-100 py-2 col-span-1">Area</span>
        <span className="border-r-2 border-gray-100 py-2 col-span-2">Posted On</span>
        <span className="border-r-2 border-gray-100 py-2 col-span-2">Submission Date</span>
        <span className="border-r-2 border-gray-100 py-2 col-span-2">Status</span>
        <span className="py-2 col-span-2">Source</span>
      </div>
      <div>
        {jobs.map((detail) => {
          return (
            <div
              className="grid grid-cols-12 text-center bg-purple-200 text-text font-semibold font-notosans rounded-lg overflow-hidden"
              key={detail.id}
            >
              <span className="border-r-2 border-b-2 border-gray-100 py-2 col-span-1">
                {detail.company}
              </span>
              <span className="border-r-2 border-b-2 border-gray-100 py-2 col-span-2">
                {detail.role}
              </span>
              <span className="border-r-2 border-b-2 border-gray-100 py-2 col-span-1">
                {detail.area}
              </span>
              <span className="border-r-2 border-b-2 border-gray-100 py-2 col-span-2">
                {detail.posted}
              </span>
              <span className="border-r-2 border-b-2 border-gray-100 py-2 col-span-2">
                {detail.submission}
              </span>
              <span className="border-r-2 border-b-2 border-gray-100 py-2 col-span-2">
                {detail.status}
              </span>
              <span className="border-b-2 border-gray-100  py-2 col-span-2">{detail.source}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Body
