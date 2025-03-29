import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { HamburgerMenuContext } from "../../../shared/contexts/AppContexts.js";
import { JobSidebarToggleContext } from "../../../shared/contexts/AppContexts.js";
import Button from "../../../shared/components/Button.jsx";
import JobEntry from "./JobEntry.jsx";
import JobsCard from "./JobsCard.jsx";
import Dropdown from "../../../shared/components/Dropdown.jsx";
import JobSidebar from "./JobSidebar.jsx";
import formatDate from "../../../shared/helpers/formatDate.js";
import { JobsDataContext } from "../../../shared/contexts/AppContexts.js";
import { formInitialState } from "../../../shared/helpers/constants.js";

// Organize jobs by date order function logic
const handleDateFilterChange = (value, jobs, setDateFilter, statusFilter, setStatusFilter, setFilteredJobs) => {
  setDateFilter(value);
  let sortedJobs = [...jobs];
  // When date filter changes, reset status filter to "All"
  if (statusFilter !== "All") {
    setStatusFilter("All");
  }
  // Sorting jobs based on the selected date filter
  if (value === "Posted (Newest)") {
    sortedJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  } else if (value === "Posted (Oldest)") {
    sortedJobs.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
  } else if (value === "Applied (Newest)") {
    sortedJobs.sort((a, b) => new Date(b.submitDate) - new Date(a.submitDate));
  } else if (value === "Applied (Oldest)") {
    sortedJobs.sort((a, b) => new Date(a.submitDate) - new Date(b.submitDate));
  }
  setFilteredJobs(sortedJobs);
};

// Organize jobs by status order function logic
const handleStatusFilterChange = (value, jobs, setDateFilter, setStatusFilter, setFilteredJobs) => {
  setStatusFilter(value);
  // Reset date filter to "Date" when status changes
  if (value !== "All") {
    setDateFilter("");
  }
  if (value === "All") {
    setFilteredJobs(jobs);
  } else {
    const filteredJob = jobs.filter((job) => job.status.toLowerCase() === value.toLowerCase());
    setFilteredJobs(filteredJob);
  }
};

const JobEntryContainer = ({ isJobEntryDialogOpen, setIsJobEntryDialogOpen }) => {
  // job data obj model
  const [formData, setFormData] = useState(formInitialState);
  return (
    <>
      {isJobEntryDialogOpen && <div className="fixed inset-0 z-20 bg-black opacity-50 cursor-pointer" onClick={() => setIsJobEntryDialogOpen(false)} aria-hidden="true"></div>}
      <dialog className="z-30 rounded-lg" open={isJobEntryDialogOpen}>
        <JobEntry setIsJobEntryDialogOpen={setIsJobEntryDialogOpen} formData={formData} setFormData={setFormData} />
      </dialog>
    </>
  );
};

const HeaderToolbar = ({ jobsList, setFilteredJobs, isJobEntryDialogOpen, setIsJobEntryDialogOpen }) => {
  // Date filter ---->
  const [dateFilter, setDateFilter] = useState("");
  // Status filter ---->
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <>
      <div className="flex items-center flex-wrap">
        {/* Date filter */}
        <Dropdown
          itemsArray={[
            { id: 1, element: "Posted (Newest)" },
            { id: 2, element: "Posted (Oldest)" },
            { id: 3, element: "Applied (Newest)" },
            { id: 4, element: "Applied (Oldest)" },
          ]}
          placeholder={dateFilter || "Date"}
          dropStyle="h-7 sm:h-9 min-w-[150px] border border-border bg-background_2 text-text"
          selectedValue={dateFilter}
          onSelectChange={(value) => handleDateFilterChange(value, jobsList, setDateFilter, statusFilter, setStatusFilter, setFilteredJobs)}
        />
        {/* Status filter */}
        <Dropdown
          itemsArray={[
            { id: 1, element: "All" },
            { id: 2, element: "Draft" },
            { id: 3, element: "Applied" },
            { id: 4, element: "Interview Scheduled" },
            { id: 5, element: "Interview Completed" },
            { id: 6, element: "Offer Received" },
            { id: 7, element: "Accepted" },
            { id: 8, element: "Rejected" },
            { id: 9, element: "Withdrawn" },
          ]}
          placeholder={statusFilter || "Status"}
          dropStyle="h-7 sm:h-9 min-w-[150px] mr-4 border border-border bg-background_2 text-text"
          selectedValue={statusFilter}
          onSelectChange={(value) => handleStatusFilterChange(value, jobsList, setDateFilter, setStatusFilter, setFilteredJobs)}
        />
        {/* Job Entry/Create button */}
        <Button className="rounded-3xl ml-2 px-4 py-2 mt-2 sm:mt-0 md:mt-1 bg-primary text-gray-100 font-semibold active:bg-secondary" onClick={() => setIsJobEntryDialogOpen(!isJobEntryDialogOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          Create
        </Button>
      </div>
    </>
  );
};

// Main Body functional component
const Body = () => {
  // Context APIs
  const { setIsSidebarOpenToggle } = useContext(HamburgerMenuContext);
  const { jobsList } = useContext(JobsDataContext);
  const { setIsJobSidebarOpen } = useContext(JobSidebarToggleContext);

  // States
  const [isJobEntryDialogOpen, setIsJobEntryDialogOpen] = useState(false);

  // Other hooks
  const navigate = useNavigate();

  // Main function to arrange the jobs
  const [filteredJobs, setFilteredJobs] = useState([]);
  useEffect(() => {
    setFilteredJobs(jobsList);
  }, [jobsList]);

  // Cleanup(toggle off) JobSidebar on Unmounting Body.jsx
  useEffect(() => {
    setIsJobSidebarOpen(false);
  }, [navigate]);

  // Main JSX
  return (
    <>
      {/* Background Overlay ^ */}
      <div className="w-full h-screen p-4 bg-background">
        {/* Job entry container */}
        <JobEntryContainer isJobEntryDialogOpen={isJobEntryDialogOpen} setIsJobEntryDialogOpen={setIsJobEntryDialogOpen} />
        <div>
          {/* Job Sidebar */}
          <JobSidebar />
          <div className="flex justify-between flex-wrap items-center mb-3">
            {/* Sidebar nav toggle */}
            <div className="flex justify-center items-center gap-3">
              <img onClick={() => setIsSidebarOpenToggle()} className="max-w-5 sm:max-w-7 rounded-md bg-black cursor-pointer" src="./assets/images/icons8-menu-120.png" alt="hamburger button" />
              <h1 className="text-2xl text-text font-bold font-geist">Overview</h1>
            </div>
            {/* Header toolbar */}
            <HeaderToolbar jobsList={jobsList} setFilteredJobs={setFilteredJobs} isJobEntryDialogOpen={isJobEntryDialogOpen} setIsJobEntryDialogOpen={setIsJobEntryDialogOpen} />
          </div>
        </div>
        {/* Jobs card view section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min overflow-y-auto h-[86vh]">
          {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
            filteredJobs.map((detail) => <JobsCard key={detail._id} id={detail.id} company={detail.company} area={detail.area} role={detail.role} postedDate={formatDate(detail.postedDate)} submitDate={formatDate(detail.submitDate)} status={detail.status} source={detail.source} notes={detail.notes} interviewDate={detail.interviewDate} todos={detail.todos} fullData={detail} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">No jobs available.</p>
          )}
          {/* TODO: Improve later with some illustration */}
        </div>
      </div>
    </>
  );
};

export default Body;
