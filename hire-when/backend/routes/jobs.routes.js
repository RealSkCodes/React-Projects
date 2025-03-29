import express from "express";
import Job from "../models/job.model.js";
import Joi from "joi";
import { io } from "../index.js";
import checkUserAuth from "../middlewares/checkUserAuth.js";

const jobsRouter = express.Router();

// Get all jobs from db route
jobsRouter.get("/api/get-jobs", checkUserAuth, async (req, res) => {
  try {
    console.log(req.user.id);
    const result = await Job.find({ userId: req.user.id });
    res.status(200).json({ result, message: "Jobs data retrived successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Add new job route
jobsRouter.post("/api/add-job", checkUserAuth, async (req, res) => {
  console.log(req.body);
  try {
    // Validate the job data fields
    const schema = Joi.object().keys({
      userId: Joi.string()
        .trim()
        .required()
        .custom((value, helpers) => {
          if (value !== req.user.id) {
            return helpers.message("You are not authorized to add a job for this user.");
          }
          return value;
        }),
      company: Joi.string().trim().required(),
      role: Joi.string().trim().required(),
      area: Joi.string().trim().required(),
      postedDate: Joi.date().required(),
      submitDate: Joi.date(),
      salary: Joi.string().trim(),
      status: Joi.string().trim().valid("Draft", "Applied", "Interview Scheduled", "Interview Completed", "Offer Received", "Accepted", "Rejected", "Withdrawn").required(),
      source: Joi.string().trim().required(),
      notes: Joi.string().allow("", null).optional(),
      interviewDate: Joi.date().allow(null).optional(),
      todos: Joi.array().optional(),
    });
    const { error, value } = schema.validate(req.body);
    if (error)
      return res.status(400).json({
        error: error,
        //          error: "Something went wrong. Please check your input and try again.",
      });

    // Access the sanitized data and save to db
    const { userId, company, role, area, postedDate, submitDate, salary, status, source, notes, interviewDate, todos } = value;
    const jobData = new Job({
      userId: userId,
      company: company,
      role: role,
      area: area,
      postedDate: postedDate,
      submitDate: submitDate,
      salary: salary,
      status: status,
      source: source,
      notes: notes,
      interviewDate: interviewDate,
      todos: todos,
    });
    await jobData.save();
    io.emit("job_added");

    // Send response
    res.status(200).json({
      message: "Job data saved successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

// Edit specific job data with new data
jobsRouter.put("/api/edit-job", checkUserAuth, async (req, res) => {
  const formData = req.body;
  console.log("Previous job's updated data received to backend", formData);

  io.emit("job_edited"); // Emit event after successful editing job
  res.status(200).json({
    message: `Job updated successfully`,
  });
});

// Update the todos in db with new todos data
jobsRouter.put("/api/edit-todos", checkUserAuth, async (req, res) => {
  const formData = req.body;
  console.log("Todos updated data received to backend", formData);

  io.emit("todos_edited");
  res.status(200).json({
    message: `Todos updated successfully`,
  });
});

export default jobsRouter;
