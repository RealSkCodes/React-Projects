import { useState, useEffect, useContext } from "react";
import InputField from "../../../shared/components/InputField.jsx";
import Dropdown from "../../../shared/components/Dropdown.jsx";
import Button from "../../../shared/components/Button.jsx";
import { JobSidebarToggleContext } from "../../../shared/contexts/AppContexts.js";
import useAuth from "../../../shared/hooks/useAuth.js";
import { formInitialState } from "../../../shared/helpers/constants.js";

const handlePineconSync = async () => {
  //TODO: update to axios
  const response = await fetch("http://localhost:3000/sync-pinecone", {
    method: "POST",
  });
  const result = await response.json();
  console.log(result.message);
};

const JobEntryContainer = ({ setIsJobEntryDialogOpen, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/50">
      <div className="flex flex-col justify-center items-center min-w-[70vw] min-h-[80vh] bg-background rounded-lg shadow-lg p-5 relative">
        <Button className="absolute top-4 right-4 text-2xl text-text hover:text-secondary bg-background" onClick={() => setIsJobEntryDialogOpen(false)}>
          ❌
        </Button>
        <h1 className="text-2xl font-medium text-accent border-b-2 border-border px-3">Job Entry Form</h1>
        {children}
      </div>
    </div>
  );
};

// Section for dynamic interview fields appearence based on job status
const InterviewEntrySection = ({ formData, setFormData }) => {
  // Todo creation function states
  const [todoText, setTodoText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const isInterviewStatus = formData.status === "Interview Scheduled" || formData.status === "Interview Completed";

  // Function which sets the new todoText in a todoList array obj
  const handleTodoInputChange = () => {
    if (todoText.trim() === "") return;
    const newTodo = {
      id: todoList.length + 1,
      element: todoText.trim(),
      isdone: false,
    };
    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    setFormData({ ...formData, todos: updatedTodoList });
    setTodoText("");
  };
  useEffect(() => {
    // Load todos from formData on component mount (for editing).  Parse if it's a string.
    if (formData.todos) {
      const parsedTodos = typeof formData.todos === "string" ? JSON.parse(formData.todos) : formData.todos;
      setTodoList(parsedTodos);
    }
  }, [formData.todos]);
  return (
    <>
      {isInterviewStatus && (
        <>
          <InputField title="Interview Date" inpType="date" inpStyle="h-12 max-w-[350px] min-w-[300px] rounded-none border-b-2 border-border bg-background text-text focus:border-red-400" titleStyle="text-lg font-normal text-accent" mainBgStyle="mb-3" inpValue={!isInterviewStatus ? "" : formData.interview_date} onInpChange={(e) => setFormData(isInterviewStatus ? { ...formData, interviewDate: e.target.value } : { ...formData, interviewDate: null })} isRequired={true} />
          <div className="flex items-center pb-3">
            <InputField title="Todos" titleStyle="text-lg font-normal text-accent" inpStyle="h-12 max-w-[350px] min-w-[300px] rounded-none border-b-2 border-border bg-background text-text focus:border-red-400" inpValue={todoText} onInpChange={(e) => setTodoText(e.target.value)} />
            <Dropdown itemsArray={todoList} titleStyle="text-lg font-normal text-accent" dropStyle="h-12 w-[10px] border-[1px] border-border bg-background text-text p-2" mainBgStyle="pt-7 ml-[-34px]" />
            <Button type="button" className="mt-7 p-1" onClick={() => handleTodoInputChange()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
              </svg>
            </Button>
          </div>
        </>
      )}
    </>
  );
};

// Main JobEntry.jsx functional component
const JobEntry = ({ setIsJobEntryDialogOpen, formData, setFormData, jobId }) => {
  // Context APIs
  const { setIsJobSidebarOpen } = useContext(JobSidebarToggleContext);
  const { auth } = useAuth();

  // States
  // Job application Status states
  const [status, setStatus] = useState("");
  const [isInvalidStatus, setIsInvalidStatus] = useState(false);

  // Function for handling job status change
  const handleStatusChange = (value) => {
    setStatus(value);
    setFormData({ ...formData, status: value });
  };
  const handleJobRequest = async () => {
    // New job creation/entry
    const response = await fetch(`http://localhost:3000/api/${!jobId ? "add-job" : "edit-job"}`, {
      //TODO: update to axios
      method: !jobId ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...formData, ...(!jobId ? { userId: auth.userId } : { id: jobId }) }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    console.log("Json data", json);
  };

  const handleFormReset = async () => {
    setIsJobEntryDialogOpen(false);
    setIsJobSidebarOpen(false);
    setFormData(formInitialState);
    setStatus("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate dropdown
    if (!formData.status) {
      setIsInvalidStatus(true);
      return;
    }
    try {
      // If jobId doesnt exist then 'add-job' otherwise 'edit-job'
      await handleJobRequest();
      // Handle form reset
      await handleFormReset();

      // Sync the latest db data with pinecone db for HireAI
      await handlePineconSync();
    } catch (error) {
      console.error("Error submitting JobEntry form:", error);
    }
  };

  return (
    <JobEntryContainer setIsJobEntryDialogOpen={setIsJobEntryDialogOpen}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-4 rounded-lg">
        <div className="grid gap-4 p-6 mx-4 rounded-2xl max-w-[1000px] lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
          <InputField title="Company" inpType="text" inpPlaceholder="Enter company name here..." inpStyle="h-12 max-w-[350px] min-w-[300px] rounded-none border-b-2 border-border bg-background text-text focus:border-red-400" titleStyle="text-lg font-normal text-accent" mainBgStyle="mb-3" inpValue={formData.company} onInpChange={(e) => setFormData({ ...formData, company: e.target.value })} isRequired={true} max="50" />
          <InputField title="Role" inpType="text" inpPlaceholder="Enter role here..." inpStyle="h-12 max-w-[350px] min-w-[300px] rounded-none border-b-2 border-border bg-background text-text focus:border-red-400" titleStyle="text-lg font-normal text-accent" mainBgStyle="mb-3" inpValue={formData.role} onInpChange={(e) => setFormData({ ...formData, role: e.target.value })} isRequired={true} max="100" />
          <InputField title="Area" inpType="text" inpPlaceholder="Enter location name here..." inpStyle="h-12 max-w-[350px] min-w-[300px] rounded-none border-b-2 border-border bg-background text-text focus:border-red-400" titleStyle="text-lg font-normal text-accent" mainBgStyle="mb-3" inpValue={formData.area} onInpChange={(e) => setFormData({ ...formData, area: e.target.value })} isRequired={true} max="100" />
          <InputField title="Posted On" inpType="date" inpStyle="h-12 max-w-[350px] min-w-[300px] rounded-none border-b-2 border-border bg-background text-text focus:border-red-400" titleStyle="text-lg font-normal text-accent" mainBgStyle="mb-3" inpValue={formData.postedDate} onInpChange={(e) => setFormData({ ...formData, postedDate: e.target.value })} isRequired={true} />
          <InputField title="Submission Date" inpType="date" inpStyle="h-12 max-w-[350px] min-w-[300px] rounded-none border-b-2 border-border bg-background text-text focus:border-red-400" titleStyle="text-lg font-normal text-accent" mainBgStyle="mb-3" inpValue={formData.submitDate} onInpChange={(e) => setFormData({ ...formData, submitDate: e.target.value })} isRequired={true} />
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
            titleStyle="text-lg font-normal text-accent"
            dropStyle="h-12 max-w-[350px] min-w-[300px] border-b-2 border-border rounded-none text-text p-2 focus:border-red-400"
            mainBgStyle="mb-3"
            selectedValue={formData.status}
            isInvalid={isInvalidStatus}
            errorMessage="You must select a job status."
            onSelectChange={(value) => handleStatusChange(value)}
          />
          <InputField title="Source" inpType="url" inpPlaceholder="Enter reference link here..." inpStyle="h-12 max-w-[350px] min-w-[300px] rounded-none border-b-2 border-border bg-background text-text focus:border-red-400" titleStyle="text-lg font-normal text-accent" mainBgStyle="mb-3" inpValue={formData.source} onInpChange={(e) => setFormData({ ...formData, source: e.target.value })} isRequired={true} />
          <InputField title="Salary" inpType="text" inpPlaceholder="Enter salary here..." inpStyle="h-12 max-w-[350px] min-w-[300px] rounded-none border-b-2 border-border bg-background text-text focus:border-red-400" titleStyle="text-lg font-normal text-accent" mainBgStyle="mb-3" inpValue={formData.salary} onInpChange={(e) => setFormData({ ...formData, salary: e.target.value })} isRequired={true} max="30" />
          <InputField title="Notes" inpType="text" inpPlaceholder="Enter notes here..." inpStyle="h-12 max-w-[350px] min-w-[300px] rounded-none border-b-2 border-border bg-background text-text focus:border-red-400" titleStyle="text-lg font-normal text-accent" mainBgStyle="mb-3" inpValue={formData.notes} onInpChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
          <InterviewEntrySection formData={formData} setFormData={setFormData} />
        </div>
        <Button type="submit" className="px-6 py-3 mt-3 text-gray-100 font-semibold rounded-lg shadow-md bg-gradient-to-br from-primary to-secondary active:from-secondary active:to-primary">
          Submit
        </Button>
      </form>
    </JobEntryContainer>
  );
};

export default JobEntry;
