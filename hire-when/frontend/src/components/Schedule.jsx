import Button from "./Button.jsx"
import JobEntry from "./JobEntry.jsx"
import { useState } from "react"

const Schedule = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="w-full p-4 bg-background">
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
        <h1 className="text-2xl font-bold text-text mb-3 font-geist">Interview Schedules</h1>
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
      <div className="grid grid-cols-12 text-center bg-primary text-text font-audiowide rounded-lg shadow-[3px_3px_8px_0px_rgba(0,0,0,0.8)] mb-2 border-2 border-blue-700">
        <span className="py-2 col-span-2">Date</span>
        <span className="py-2 col-span-1">Company</span>
        <span className="py-2 col-span-1">Area</span>
        <span className="py-2 col-span-2">Status</span>
        <span className="py-2 col-span-2">Source</span>
        <span className="py-2 col-span-4">Note</span>
      </div>
      <div className="border-[1px] border-border rounded-lg overflow-y-auto h-[78vh]">
        {[
          {
            id: 1,
            company: "Google",
            role: "Front-end dev",
            area: "Mumbai",
            posted: "25th dec, 2024",
            submission: "29th dec, 2024",
            status: "Pending",
            source: "https://google.com",
            note: "Interviewer focuses on in depth knowledge more! brah be careful",
          },
          {
            id: 2,
            company: "Facebook",
            role: "Full Stack dev",
            area: "Kolkata",
            posted: "25th dec, 2024",
            submission: "29th dec, 2024",
            status: "Interview Pending",
            source: "https://facebook.com",
            note: "Interviewer focuses on in depth knowledge more!",
          },
          {
            id: 3,
            company: "Facebook",
            role: "Full Stack dev",
            area: "Kolkata",
            posted: "25th dec, 2024",
            submission: "29th dec, 2024",
            status: "Interview Pending",
            source: "https://facebook.com",
            note: "Interviewer focuses on in depth knowledge more!",
          },
        ].map((detail) => {
          return (
            <div className="group relative" key={detail.id}>
              <div className="grid grid-cols-12 text-center bg-background_2 text-text font-normal font-geist overflow-hidden hover:bg-slate-800">
                <span className="border-b-[1px] border-border py-2 col-span-2">
                  {detail.submission}
                </span>
                <span className="border-b-[1px] border-border py-2 col-span-1">
                  {detail.company}
                </span>
                <span className="border-b-[1px] border-border py-2 col-span-1">{detail.area}</span>
                <span className="border-b-[1px] border-border py-2 col-span-2">
                  {detail.status}
                </span>
                <span className="border-b-[1px] border-border py-2 col-span-2">
                  {detail.source}
                </span>
                <span className="border-b-[1px] border-border py-2 col-span-4">{detail.note}</span>
              </div>

              {/* The container for the buttons */}
              <div className="absolute z-10 right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 flex space-x-2 transition-all duration-300 ease-in-out items-center">
                <Button
                  addStyle="py-1 bg-secoundary text-white rounded-md shadow-md transform transition-all duration-300 hover:bg-blue-600 hover:scale-105 hover:shadow-lg"
                  name="View"
                />
                <Button
                  addStyle="py-1 bg-secoundary text-white rounded-md shadow-md transform transition-all duration-300 hover:bg-purple-600 hover:scale-105 hover:shadow-lg"
                  name="Edit"
                  onclick={() => setIsDialogOpen(true)}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Schedule
