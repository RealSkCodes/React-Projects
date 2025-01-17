import { useState } from "react"
import InputField from "./InputField.jsx"
import Dropdown from "./Dropdown.jsx"
import Button from "./Button.jsx"

const JobEntry = ({ setIsDialogOpen }) => {
  // Input's state
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    area: "",
    posted_on: "",
    submission_date: "",
    status: "",
    source: "",
    salary: "",
    notes: "",
  })

  // Dropdown's State
  const [status, setStatus] = useState("") // State to manage selected value
  const handleStatusChange = (value) => {
    setStatus(value)
    setFormData({ ...formData, status: value })
  }

  // Handle the formData on Submit click
  const handleClick = async (formData, setIsDialogOpen) => {
    const data = await fetch("http://localhost:3000/add-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    const json = await data.json()
    console.log("Json data", json)
    setIsDialogOpen(false)
    setFormData({
      company: "",
      role: "",
      area: "",
      posted_on: "",
      submission_date: "",
      status: "",
      source: "",
      salary: "",
      notes: "",
    })
    setStatus("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/50">
      <div className="flex flex-col items-center min-w-min bg-background_2 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between w-full px-4 py-3 rounded-lg bg-background">
          <h1 className="text-2xl font-bold text-gray-100">Job Entry Form</h1>
          <Button
            name="❌"
            addStyle="text-2xl text-gray-100 hover:text-accent text-right"
            onclick={() => setIsDialogOpen(false)}
          />
        </div>
        {/* Form Section */}
        <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg">
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
            />
            <InputField
              title="Posted On"
              inpType="date"
              inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
              titleStyle="text-xl font-medium text-text"
              mainBgStyle="mb-3"
              inpValue={formData.posted_on}
              onInpChange={(e) => setFormData({ ...formData, posted_on: e.target.value })}
            />
            <InputField
              title="Submission Date"
              inpType="date"
              inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
              titleStyle="text-xl font-medium text-text"
              mainBgStyle="mb-3"
              inpValue={formData.submission_date}
              onInpChange={(e) => setFormData({ ...formData, submission_date: e.target.value })}
            />
            <Dropdown
              itemsArray={[
                "Draft",
                "Applied",
                "Interview Scheduled",
                "Interview Completed",
                "Offer Received",
                "Accepted",
                "Rejected",
                "Withdrawn",
              ]}
              title="Status"
              titleStyle="text-xl font-medium text-text"
              dropStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text p-2"
              mainBgStyle="mb-3"
              selectedValue={status} // Bind state
              onSelectChange={handleStatusChange} // Handle selection changes
            />
            <InputField
              title="Source"
              inpType="text"
              inpPlaceholder="Enter reference link here..."
              inpStyle="h-12 max-w-[350px] min-w-[300px] border-[1px] border-border bg-background_2 text-text"
              titleStyle="text-xl font-medium text-text"
              mainBgStyle="mb-3"
              inpValue={formData.source}
              onInpChange={(e) => setFormData({ ...formData, source: e.target.value })}
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
          </div>
          <Button
            addStyle="px-6 py-3 text-gray-100 font-semibold rounded-lg shadow-md bg-primary active:bg-secoundary"
            name="Submit"
            onclick={() => handleClick(formData, setIsDialogOpen)}
          />
        </div>
      </div>
    </div>
  )
}

export default JobEntry
