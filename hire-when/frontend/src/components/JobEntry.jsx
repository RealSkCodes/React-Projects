import React from "react"
import InputField from "./InputField.jsx"
import Dropdown from "./Dropdown.jsx"
import Button from "./Button.jsx"

const JobEntry = () => {
  return (
    <div className="w-dvw bg-[#eae9ee] flex flex-col items-center">
      <h1 className="font-semibold text-2xl m-2">Job Entry Form</h1>
      <div className="flex flex-col justify-center items-center">
        <div className="grid gap-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 bg-[#f5f4fa] border-gray-300 border-[1px] rounded-2xl max-w-[1000px] mx-4 p-3">
          <InputField
            title="Company"
            inpType="text"
            inpPlaceholder="Enter company name here..."
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
          />
          <InputField
            title="Role"
            inpType="text"
            inpPlaceholder="Enter role here..."
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
          />
          <InputField
            title="Area"
            inpType="text"
            inpPlaceholder="Enter location name here..."
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
          />
          <InputField
            title="Posted On"
            inpType="date"
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
          />
          <InputField
            title="Submission Date"
            inpType="date"
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
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
          />
          <InputField
            title="Source"
            inpType="text"
            inpPlaceholder="Enter company name here..."
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
          />
          <InputField
            title="Salary"
            inpType="text"
            inpPlaceholder="Enter company name here..."
            inpStyle="min-w-[300px] max-w-[350px] border-[1px]"
            titleStyle="text-xl font-normal"
            mainBgStyle="mb-3"
          />
        </div>
        <Button
          addStyle="bg-primary px-4 py-1 text-gray-100 font-semibold rounded-lg shadow-xl hover:scale-105 hover:bg-accent active:bg-primary"
          name="Submit"
        />
      </div>
    </div>
  )
}

export default JobEntry
