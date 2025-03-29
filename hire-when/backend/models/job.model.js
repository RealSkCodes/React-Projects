import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  // TODO: add more schema properties for each field later for accurate data
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
  },
  postedDate: {
    type: Date,
    required: true,
    trim: true,
  },
  submitDate: {
    type: Date,
    required: false,
    trim: true,
  },
  salary: {
    type: String,
    required: false,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "Draft",
      "Applied",
      "Interview Scheduled",
      "Interview Completed",
      "Offer Received",
      "Accepted",
      "Rejected",
      "Withdrawn",
    ],
  },
  source: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    required: false,
    trim: true,
  },
  interviewDate: {
    type: Date,
    required: false,
    trim: true,
    default: null,
  },
  todos: {
    type: Array,
    required: false,
    trim: true,
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
