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
  // Handle the formData on click
  const handleClick = async (formData) => {
    const data = await fetch("http://localhost:3000/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    const json = await data.json()
    console.log("Json data", json)
  }
  return (
    <div className="min-w-min bg-[#eae9ee] flex flex-col items-center rounded-lg">
      <div className="flex justify-between w-full rounded-lg">
        <h1 className="font-semibold text-2xl mx-4 my-3">Job Entry Form</h1>
        <Button name="❌" addStyle="text-right text-2xl" onclick={() => setIsDialogOpen(false)} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid gap-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 bg-[#f5f4fa] border-gray-300 border-[1px] rounded-2xl max-w-[1000px] mx-4 p-3">
          <InputField
            title="Company"
            inpType="text"
            inpPlaceholder="Enter company name here..."
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
            inpValue={formData.company}
            onInpChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          <InputField
            title="Role"
            inpType="text"
            inpPlaceholder="Enter role here..."
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
            inpValue={formData.role}
            onInpChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          <InputField
            title="Area"
            inpType="text"
            inpPlaceholder="Enter location name here..."
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
            inpValue={formData.area}
            onInpChange={(e) => setFormData({ ...formData, area: e.target.value })}
          />
          <InputField
            title="Posted On"
            inpType="date"
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
            inpValue={formData.posted_on}
            onInpChange={(e) => setFormData({ ...formData, posted_on: e.target.value })}
          />
          <InputField
            title="Submission Date"
            inpType="date"
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
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
            titleStyle="text-xl font-normal"
            dropStyle="min-w-[300px] max-w-[350px] border-[1px] p-1"
            mainBgStyle="mb-3"
            selectedValue={status} // Bind state
            onSelectChange={handleStatusChange} // Handle selection changes
          />
          <InputField
            title="Source"
            inpType="text"
            inpPlaceholder="Enter reference link here..."
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
            inpValue={formData.source}
            onInpChange={(e) => setFormData({ ...formData, source: e.target.value })}
          />
          <InputField
            title="Salary"
            inpType="text"
            inpPlaceholder="Enter salary here..."
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
            inpValue={formData.salary}
            onInpChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          />
          <InputField
            title="Notes"
            inpType="text"
            inpPlaceholder="Enter notes here..."
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
            inpValue={formData.notes}
            onInpChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
        <Button
          addStyle="bg-primary px-5 py-2 text-gray-100 font-semibold rounded-lg shadow-xl hover:scale-105 hover:bg-accent active:bg-primary"
          name="Submit"
          onclick={() => handleClick(formData)}
        />
      </div>
    </div>
  )
}

export default JobEntry
