import Button from "./Button.jsx"
import JobEntry from "./JobEntry.jsx"
import { useState } from "react"

const Schedule = () => {
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
        <h1 className="font-bold text-2xl text-text mb-3 font-notosans">Interview Schedules</h1>
        <Button
          name="Create ➕"
          addStyle="bg-primary px-4 py-2 text-gray-100 font-semibold rounded-xl shadow-xl hover:scale-105 hover:bg-accent active:bg-primary"
          onclick={() => setIsDialogOpen(!isDialogOpen)}
        />
      </div>
      <div className="grid grid-cols-12 text-center font-audiowide bg-accent text-gray-100 rounded-lg shadow-[3px_3px_8px_0px_rgba(0,0,0,0.8)] mb-2 border-gray-200 border-2">
        <span className="border-r-2 border-gray-100 py-2 col-span-2">Date</span>
        <span className="border-r-2 border-gray-100 py-2 col-span-1">Company</span>
        <span className="border-r-2 border-gray-100 py-2 col-span-1">Area</span>
        <span className="border-r-2 border-gray-100 py-2 col-span-2">Status</span>
        <span className="border-r-2 border-gray-100 py-2 col-span-2">Source</span>
        <span className="py-2 col-span-4">Note</span>
      </div>
      <div className="">
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
            <div className="group" key={detail.id}>
              <div className="text-center bg-[#e9d5ff] text-text font-semibold font-notosans rounded-lg overflow-hidden hidden group-hover:block border-b-2 border-gray-100">
                <Button
                  addStyle="px-4 m-0 bg-primary rounded-xl text-gray-100 mr-2 shadow-[3px_2px_5px_0px_black] border-[1px] border-gray-300"
                  name="View"
                />
                <Button
                  addStyle="px-4 m-0 bg-secondary rounded-xl text-gray-100 ml-2 shadow-[3px_2px_5px_0px_black] border-[1px] border-gray-300"
                  name="Edit"
                  onclick={() => setIsDialogOpen(true)}
                />
              </div>
              <div className="grid grid-cols-12 text-center bg-purple-200 text-text font-semibold font-notosans rounded-lg overflow-hidden group-hover:hidden">
                <span className="border-r-2 border-b-2 border-gray-100 py-2 col-span-2">
                  {detail.submission}
                </span>
                <span className="border-r-2 border-b-2 border-gray-100 py-2 col-span-1">
                  {detail.company}
                </span>
                <span className="border-r-2 border-b-2 border-gray-100 py-2 col-span-1">
                  {detail.area}
                </span>
                <span className="border-r-2 border-b-2 border-gray-100 py-2 col-span-2">
                  {detail.status}
                </span>
                <span className="border-r-2 border-b-2 border-gray-100 py-2 col-span-2">
                  {detail.source}
                </span>
                <span className="border-b-2 border-gray-100 py-2 col-span-4">{detail.note}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Schedule
