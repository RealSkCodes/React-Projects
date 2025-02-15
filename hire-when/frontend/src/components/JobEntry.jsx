import { useState, useEffect, useContext } from "react"
import InputField from "./InputField" // Make sure the path is correct
import Dropdown from "./Dropdown"
import Button from "./Button"
import { JobSidebarToggleContext } from "../utils/AppContexts.js"

const JobEntry = ({ setIsDialogOpen, formData, setFormData, jobId }) => {
  const { isOpen, setIsOpen, jobData, setJobData } = useContext(JobSidebarToggleContext)
  // Todo creation function
  const [todoText, setTodoText] = useState("")
  const [todoList, setTodoList] = useState([])
  useEffect(() => {
    // Load todos from formData on component mount (for editing).  Parse if it's a string.
    if (formData.todos) {
      const parsedTodos =
        typeof formData.todos === "string" ? JSON.parse(formData.todos) : formData.todos
      setTodoList(parsedTodos)
    }
  }, [formData.todos])
  const handleTodoInputChange = () => {
    if (todoText.trim() === "") return
    const newTodo = { id: todoList.length + 1, element: todoText.trim(), isdone: false }
    const updatedTodoList = [...todoList, newTodo]
    setTodoList(updatedTodoList)
    setFormData({ ...formData, todos: updatedTodoList })
    setTodoText("")
  }

  // Job application Status function
  const [status, setStatus] = useState("")
  const [isInvalidStatus, setIsInvalidStatus] = useState(false)
  const handleStatusChange = (value) => {
    setIsInvalidStatus(false)
    setStatus(value)
    setFormData({ ...formData, status: value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    // Validate dropdown
    if (!status) {
      setIsInvalidStatus(true)
      return
    }

    if (event.target.checkValidity()) {
      try {
        // If id doesn't exist means job isn't present in db then create new job data
        if (!jobId) {
          const response = await fetch("http://localhost:3000/add-job", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          })
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const json = await response.json()
          console.log("Json data", json)

          setIsDialogOpen(false)
          setFormData({
            company: "",
            role: "",
            area: "",
            posted_date: "",
            submission_date: "",
            status: "",
            source: "",
            salary: "",
            notes: "",
            interview_date: "",
            todos: [],
          })
          setStatus("")
          const syncDataToPinecone = await fetch("http://localhost:3000/sync-pinecone", {
            method: "POST",
          })
          const syncJson = await syncDataToPinecone.json()
          console.log(syncJson.message)
        } else {
          // If id exist means job already present in db then edit the previous job data
          const response = await fetch("http://localhost:3000/edit-job", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, id: jobId }),
          })
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const json = await response.json()
          console.log("Json data", json)
          setIsDialogOpen(false)
          setIsOpen(false)
          const syncDataToPinecone = await fetch("http://localhost:3000/sync-pinecone", {
            method: "POST",
          })
          const syncJson = await syncDataToPinecone.json()
          console.log(syncJson.message)
        }
      } catch (error) {
        console.error("Error submitting form:", error)
      }
    } else {
      console.log("Form is invalid")
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/50">
      <div className="flex flex-col items-center min-w-min bg-background rounded-lg shadow-lg p-5">
        <div className="flex justify-between w-full px-4 py-3 rounded-lg bg-background">
          <h1 className="text-2xl font-bold text-gray-100">Job Entry Form</h1>
          <Button
            className="text-2xl text-text hover:text-secoundary bg-background text-right"
            onClick={() => setIsDialogOpen(false)}
          >
            ❌
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center p-4 bg-background rounded-lg"
        >
          <div className="grid gap-4 p-6 mx-4 bg-background_2 border-1 border-border rounded-2xl max-w-[1000px] lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
            <InputField
              title="Company"
              inpType="text"
              inpPlaceholder="Enter company name here..."
              inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
              titleStyle="text-xl font-medium text-text"
              mainBgStyle="mb-3"
              inpValue={formData.company}
              onInpChange={(e) => setFormData({ ...formData, company: e.target.value })}
              isRequired={true}
              max="50"
            />
            <InputField
              title="Role"
              inpType="text"
              inpPlaceholder="Enter role here..."
              inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
              titleStyle="text-xl font-medium text-text"
              mainBgStyle="mb-3"
              inpValue={formData.role}
              onInpChange={(e) => setFormData({ ...formData, role: e.target.value })}
              isRequired={true}
              max="100"
            />
            <InputField
              title="Area"
              inpType="text"
              inpPlaceholder="Enter location name here..."
              inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
              titleStyle="text-xl font-medium text-text"
              mainBgStyle="mb-3"
              inpValue={formData.area}
              onInpChange={(e) => setFormData({ ...formData, area: e.target.value })}
              isRequired={true}
              max="100"
            />
            <InputField
              title="Posted On"
              inpType="date"
              inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
              titleStyle="text-xl font-medium text-text"
              mainBgStyle="mb-3"
              inpValue={formData.posted_date}
              onInpChange={(e) => setFormData({ ...formData, posted_date: e.target.value })}
              isRequired={true}
            />
            <InputField
              title="Submission Date"
              inpType="date"
              inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
              titleStyle="text-xl font-medium text-text"
              mainBgStyle="mb-3"
              inpValue={formData.submission_date}
              onInpChange={(e) => setFormData({ ...formData, submission_date: e.target.value })}
              isRequired={true}
            />
            <Dropdown
              itemsArray={[
                { id: 1, element: "Draft" },
                { id: 2, element: "Applied" },
                { id: 3, element: "Interview Scheduled" },
                { id: 4, element: "Interview Completed" },
                { id: 5, element: "Offer Received" },
                { id: 6, element: "Accepted" },
                { id: 7, element: "Rejected" },
                { id: 8, element: "Withdrawn" },
              ]}
              title="Status"
              titleStyle="text-xl font-medium text-text"
              dropStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text p-2"
              mainBgStyle="mb-3"
              selectedValue={formData.status}
              onSelectChange={handleStatusChange}
              isInvalid={isInvalidStatus}
              errorMessage="You must select a job status."
            />
            <InputField
              title="Source"
              inpType="url"
              inpPlaceholder="Enter reference link here..."
              inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
              titleStyle="text-xl font-medium text-text"
              mainBgStyle="mb-3"
              inpValue={formData.source}
              onInpChange={(e) => setFormData({ ...formData, source: e.target.value })}
              isRequired={true}
            />
            <InputField
              title="Salary"
              inpType="text"
              inpPlaceholder="Enter salary here..."
              inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
              titleStyle="text-xl font-medium text-text"
              mainBgStyle="mb-3"
              inpValue={formData.salary}
              onInpChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              isRequired={true}
              max="30"
            />
            <InputField
              title="Notes"
              inpType="text"
              inpPlaceholder="Enter notes here..."
              inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
              titleStyle="text-xl font-medium text-text"
              mainBgStyle="mb-3"
              inpValue={formData.notes}
              onInpChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
            {(formData.status === "Interview Scheduled" ||
              formData.status === "Interview Completed") && (
              <>
                <InputField
                  title="Interview Date"
                  inpType="date"
                  inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
                  titleStyle="text-xl font-medium text-text"
                  mainBgStyle="mb-3"
                  inpValue={formData.interview_date === null ? "" : formData.interview_date}
                  onInpChange={(e) =>
                    setFormData(
                      formData.status === "Interview Scheduled" ||
                        formData.status === "Interview Completed"
                        ? { ...formData, interview_date: e.target.value }
                        : { ...formData, interview_date: "" }
                    )
                  }
                  isRequired={true}
                />
                <div className="flex items-center pb-3">
                  <InputField
                    title="Todos"
                    titleStyle="text-xl font-medium text-text"
                    inpStyle="h-12 max-w-[350px] min-w-[260px] border-[1px] border-border bg-background_2 text-text p-2 pr-6"
                    inpValue={todoText}
                    onInpChange={(e) => setTodoText(e.target.value)}
                  />
                  <Dropdown
                    itemsArray={todoList}
                    titleStyle="text-xl font-medium text-text"
                    dropStyle="h-12 w-[10px] border-[1px] border-border bg-background_2 text-text p-2"
                    mainBgStyle="pt-7 ml-[-34px]"
                  />
                  <Button
                    type="button"
                    className="mt-7 p-1"
                    onClick={() => handleTodoInputChange()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                      />
                    </svg>
                  </Button>
                </div>
              </>
            )}
          </div>
          <Button
            type="submit"
            className="px-6 py-3 mt-3 text-gray-100 font-semibold rounded-lg shadow-md bg-primary active:bg-secoundary"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default JobEntry
