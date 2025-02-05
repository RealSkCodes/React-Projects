import { useState, useContext, useEffect } from "react"
import Button from "./Button.jsx"
import { JobSidebarToggleContext } from "../utils/AppContexts.js"
import JobEntry from "./JobEntry.jsx"

const JobSidebar = () => {
  const { isOpen, setIsOpen, jobData, setJobData } = useContext(JobSidebarToggleContext)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({})

  // Set formData when jobData changes
  useEffect(() => {
    if (!jobData) return

    setFormData({
      company: jobData.company || "",
      role: jobData.role || "",
      area: jobData.area || "",
      posted_date: formatDateToISO8601(jobData.posted_date) || "",
      submission_date: formatDateToISO8601(jobData.submission_date) || "",
      salary: jobData.salary || "",
      status: jobData.status || "",
      source: jobData.source || "",
      notes: jobData.notes || "",
      interview_date: jobData.interview_date ? formatDateToISO8601(jobData.interview_date) : null,
      todos: jobData.todos || [], // Ensure todos is an array
    })
  }, [jobData])

  const formatDate = (dateString) => {
    if (!dateString) return "" // Handle undefined or null dates
    const date = new Date(dateString)
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`
  }

  const formatDateToISO8601 = (dateString) => {
    if (!dateString) return "" // Handle undefined or null dates
    const date = new Date(dateString)
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}`
  }

  // Set editedTodoList when jobData.todos changes
  const [editedTodoList, setEditedTodoList] = useState([])
  useEffect(() => {
    if (jobData.todos) {
      setEditedTodoList(jobData.todos)
    }
  }, [jobData?.todos])
  // Function for changing todo completed bool
  const handleTodoIsDone = (todoId) => {
    setEditedTodoList((prevTodoList) => {
      const updatedTodoList = prevTodoList.map((todo) =>
        todo.id === todoId ? { ...todo, isdone: !todo.isdone } : todo
      )
      return updatedTodoList
    })
  }
  // Function for deleting todo
  const handleTodoDelete = (todoId) => {
    setEditedTodoList((prevTodoList) => {
      const updatedTodoList = prevTodoList.filter((todo) => todo.id !== todoId)
      return updatedTodoList
    })
  }
  // Send the updated editedTodoList to backend db
  const handleTodolistSave = async () => {
    const response = await fetch("http://localhost:3000/edit-todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: jobData.id, todos: editedTodoList }),
    })
    const json = await response.json()
    console.log("Json data", json)
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
                <p className="text-gray-400">{formatDate(jobData.posted_date)}</p>
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
              <div>
                <h3 className="text-sm font-bold">Notes</h3>
                <p className="text-gray-400">{jobData.notes}</p>
              </div>
              {(jobData.status === "Interview Scheduled" ||
                jobData.status === "Interview Completed") && (
                <div>
                  <h3 className="text-sm font-bold">Interview Date</h3>
                  <p className="text-gray-400">{formatDate(jobData.interview_date)}</p>
                </div>
              )}
            </div>
            {(jobData.status === "Interview Scheduled" ||
              jobData.status === "Interview Completed") && (
              <div>
                <h1 className="text-lg font-bold mb-1">Todo List</h1>
                <div className="border border-border rounded-lg p-1">
                  <div className="grid grid-cols-10">
                    <h1 className="col-span-6 pl-2 border-b border-border">Task</h1>
                    <h1 className="col-span-2 text-center border-b border-border">Complete</h1>
                    <h1 className="col-span-2 text-center border-b border-border">Delete</h1>
                  </div>
                  {editedTodoList &&
                    editedTodoList.map((todo) => (
                      <div className="grid grid-cols-10 pt-1" key={todo.id}>
                        <span className="col-span-6 pl-2">{todo.element}</span>
                        <input
                          className="col-span-2 mx-auto w-4"
                          type="checkbox"
                          checked={todo.isdone}
                          onChange={() => handleTodoIsDone(todo.id)}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="red"
                          className="size-6 col-span-2 m-auto"
                          onClick={() => handleTodoDelete(todo.id)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </div>
                    ))}
                </div>
                <Button
                  className="px-3 py-2 mt-3 bg-secoundary text-black border-none font-medium"
                  onClick={handleTodolistSave}
                >
                  Save
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
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </Button>
              </div>
            )}
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

export default JobSidebar
