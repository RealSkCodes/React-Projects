import React, { useState } from "react"
import InputField from "./InputField" // Make sure the path is correct
import Dropdown from "./Dropdown"
import Button from "./Button"

const JobEntry = ({ setIsDialogOpen }) => {
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
          posted_on: "",
          submission_date: "",
          status: "",
          source: "",
          salary: "",
          notes: "",
        })
        setStatus("")
      } catch (error) {
        console.error("Error submitting form:", error)
      }
    } else {
      console.log("Form is invalid")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/50">
      <div className="flex flex-col items-center min-w-min bg-background_2 rounded-lg shadow-lg">
        <div className="flex justify-between w-full px-4 py-3 rounded-lg bg-background">
          <h1 className="text-2xl font-bold text-gray-100">Job Entry Form</h1>
          <Button
            className="text-2xl text-gray-100 hover:text-accent bg-background text-right"
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
              inpValue={formData.posted_on}
              onInpChange={(e) => setFormData({ ...formData, posted_on: e.target.value })}
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
              selectedValue={status}
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
