import { useState, useContext, useEffect } from "react";
import Button from "../../../shared/components/Button.jsx";
import PencilIcon from "../../../shared/assets/icons/PencilIcon.jsx";
import JobEntry from "./JobEntry.jsx";
import formatDate, { formatDateToISO8601 } from "../../../shared/helpers/formatDate.js";
import { JobSidebarToggleContext } from "../../../shared/contexts/AppContexts.js";

const JobSidebarContainer = ({ children, isJobSidebarOpen, setIsJobSidebarOpen }) => {
  return (
    <>
      {isJobSidebarOpen && (
        <div className="h-screen w-[450px] p-6 bg-background_2 text-text border-l border-border text-sm fixed top-0 right-0 shadow-lg z-50">
          {/* Header with title and close button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Job Overview</h1>
            <Button className="text-2xl text-text hover:text-secondary bg-background text-right" onClick={() => setIsJobSidebarOpen(false)}>
              ❌
            </Button>
          </div>
          {children}
        </div>
      )}
    </>
  );
};

const TodoListSection = ({ isInterviewStatus, jobDataSidebar }) => {
  // Set editedTodoList when jobDataSidebar.todos changes
  const [editedTodoList, setEditedTodoList] = useState([]);
  useEffect(() => {
    if (jobDataSidebar?.todos) {
      setEditedTodoList(jobDataSidebar?.todos);
    }
  }, [jobDataSidebar?.todos]);

  // Handle todo completion
  const handleTodoIsDone = (todoId) => {
    setEditedTodoList((prevTodoList) => prevTodoList.map((todo) => (todo.id === todoId ? { ...todo, isdone: !todo.isdone } : todo)));
  };
  // Handle todo deletion
  const handleTodoDelete = (todoId) => {
    setEditedTodoList((prevTodoList) => prevTodoList.filter((todo) => todo.id !== todoId));
  };

  // Send the updated editedTodoList to backend db
  const handleTodolistSave = async () => {
    // TODO: replace with axios later
    const response = await fetch("http://localhost:3000/api/edit-todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id: jobDataSidebar.id, todos: editedTodoList }),
    });
    const json = await response.json();
    console.log("Json data", json);
  };
  return (
    <>
      {isInterviewStatus && (
        <div>
          <h1 className="text-lg font-bold mb-1">Todo List</h1>
          <div className="border border-border rounded-lg p-1">
            {/* Todo List Headers */}
            <div className="grid grid-cols-10">
              <h1 className="col-span-6 pl-2 border-b border-border">Task</h1>
              <h1 className="col-span-2 text-center border-b border-border">Complete</h1>
              <h1 className="col-span-2 text-center border-b border-border">Delete</h1>
            </div>
            {/* Todo List Items */}
            {editedTodoList &&
              editedTodoList.map((todo) => (
                <div className="grid grid-cols-10 pt-1" key={todo.id}>
                  <span className="col-span-6 pl-2">{todo.element}</span>
                  <input className="col-span-2 mx-auto w-4" type="checkbox" checked={todo.isdone} onChange={() => handleTodoIsDone(todo.id)} />
                  {/* TODO: Modify this svg section to consistency */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6 col-span-2 m-auto" onClick={() => handleTodoDelete(todo.id)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </div>
              ))}
          </div>
          {/* Save button for the todo list */}
          <Button className="px-3 py-2 mt-3 bg-secondary text-black border-none font-medium" onClick={handleTodolistSave}>
            Save
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </Button>
        </div>
      )}
    </>
  );
};

const JobDetails = ({ jobDataSidebar }) => {
  const isInterviewStatus = jobDataSidebar.status === "Interview Scheduled" || jobDataSidebar.status === "Interview Completed";
  return (
    <div className="w-full p-4 bg-background rounded-lg shadow-md space-y-6">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-xl font-semibold">{jobDataSidebar.company}</h1>
          <h2 className="text-blue-400 text-sm">{jobDataSidebar.role}</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-text">
        <div>
          <h3 className="text-sm font-bold">Status</h3>
          <p className="text-gray-400">{jobDataSidebar.status}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold">Area</h3>
          <p className="text-gray-400">{jobDataSidebar.area}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold">Posted Date</h3>
          <p className="text-gray-400">{formatDate(jobDataSidebar.postedDate)}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold">Submission Date</h3>
          <p className="text-gray-400">{formatDate(jobDataSidebar.submitDate)}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold">Salary</h3>
          <p className="text-gray-400">{jobDataSidebar.salary}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold">Source</h3>
          <p className="text-blue-400 cursor-pointer">{jobDataSidebar.source}</p>
        </div>
        <div>
          <h3 className="text-sm font-bold">Notes</h3>
          <p className="text-gray-400">{jobDataSidebar.notes}</p>
        </div>
        {/* Show interview date only if relevant */}
        {isInterviewStatus && (
          <div>
            <h3 className="text-sm font-bold">Interview Date</h3>
            <p className="text-gray-400">{formatDate(jobDataSidebar.interviewDate)}</p>
          </div>
        )}
      </div>
      {/* Todo List (shown only for interview-related statuses) */}
      <TodoListSection isInterviewStatus={isInterviewStatus} jobDataSidebar={jobDataSidebar} />
    </div>
  );
};
// Main JobSidebar.jsx functional component
const JobSidebar = () => {
  // Context APIs
  const { isJobSidebarOpen, setIsJobSidebarOpen, jobDataSidebar } = useContext(JobSidebarToggleContext);
  // States
  const [isJobEntryDialogOpen, setIsJobEntryDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // Set formData when jobDataSidebar changes
  useEffect(() => {
    if (!jobDataSidebar) return;
    setFormData({
      company: jobDataSidebar.company || "",
      role: jobDataSidebar.role || "",
      area: jobDataSidebar.area || "",
      postedDate: formatDateToISO8601(jobDataSidebar.postedDate) || "",
      submitDate: formatDateToISO8601(jobDataSidebar.submitDate) || "",
      salary: jobDataSidebar.salary || "",
      status: jobDataSidebar.status || "",
      source: jobDataSidebar.source || "",
      notes: jobDataSidebar.notes || "",
      interviewDate: jobDataSidebar.interviewDate ? formatDateToISO8601(jobDataSidebar.interviewDate) : null,
      todos: jobDataSidebar.todos || [],
    });
  }, [jobDataSidebar]);

  return (
    <JobSidebarContainer isJobSidebarOpen={isJobSidebarOpen} setIsJobSidebarOpen={setIsJobSidebarOpen}>
      <JobDetails jobDataSidebar={jobDataSidebar} />
      {/* Job entry section to edit a job's data */}
      <Button className="px-3 py-2 mt-3 bg-accent text-black border-none font-medium" onClick={() => setIsJobEntryDialogOpen(true)}>
        Edit
        <PencilIcon />
      </Button>
      <dialog className="z-30 rounded-lg" open={isJobEntryDialogOpen}>
        <JobEntry setIsJobEntryDialogOpen={setIsJobEntryDialogOpen} formData={formData} setFormData={setFormData} jobId={jobDataSidebar._id} />
      </dialog>
    </JobSidebarContainer>
  );
};

export default JobSidebar;
