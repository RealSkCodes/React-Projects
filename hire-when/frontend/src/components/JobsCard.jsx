import { useContext } from "react"
import { JobSidebarToggleContext } from "../utils/AppContexts.js"

const JobsCard = ({
  id,
  company,
  role,
  status,
  area,
  source,
  posted_date,
  submission_date,
  notes,
  salary,
  fullData,
}) => {
  const { isOpen, setIsOpen, jobData, setJobData } = useContext(JobSidebarToggleContext)

  const handleClick = () => {
    setJobData(fullData)
    setIsOpen(true)
  }

  return (
    <div
      className="card p-4 h-min space-y-2 bg-gradient-to-br from-background_2 to-background border border-border text-text font-geist rounded-lg shadow-md hover:bg-gradient-to-br hover:from-background_2 hover:to-background_3 cursor-pointer"
      key={id}
      onClick={() => handleClick()}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-sm">{company}</h3>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-md ${
            status === "Accepted"
              ? "bg-green-500 text-white"
              : status === "Rejected"
              ? "bg-red-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-muted-foreground">Area</p>
          <p className="overflow-hidden">{area}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Source</p>
          <p className="overflow-hidden">{source}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Posted</p>
          <p className="overflow-hidden">{posted_date}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Submission</p>
          <p className="overflow-hidden">{submission_date}</p>
        </div>
      </div>
    </div>
  )
}

export default JobsCard
