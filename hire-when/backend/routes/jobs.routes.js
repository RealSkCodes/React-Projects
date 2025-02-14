import express from "express"
import pool from "../config/db.config.js"
import { io } from "../index.js"

const jobsRouter = express.Router()

// Get all jobs from Database
jobsRouter.get("/jobs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jobs_2;")
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal Server Error")
  }
})

// Post all incoming job data from Frontend to Backend to Database
jobsRouter.post("/add-job", async (req, res) => {
  const formData = req.body
  console.log("Received Data:", formData)
  const query = `INSERT INTO jobs_2 (company, role, area, posted_date, submission_date, status, source, salary, notes, interview_date, todos)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`

  const values = [
    formData.company,
    formData.role,
    formData.area,
    formData.posted_date || null,
    formData.submission_date || null,
    formData.status,
    formData.source,
    formData.salary,
    formData.notes,
    formData.interview_date || null,
    JSON.stringify(formData.todos) || "[]",
  ]
  await pool.query(query, values)

  io.emit("job_added") // Emit event after successful insertion
  // Send response back to Frontend client
  res.status(200).json({
    message: "Data received successfully from Frontend",
  })
})

// Edit specific job data with new data
jobsRouter.put("/edit-job", async (req, res) => {
  const formData = req.body
  console.log("Previous job's updated data received to backend", formData)

  const query = `
    UPDATE jobs_2
    SET 
      company = $1,
      role = $2,
      area = $3,
      posted_date = $4,
      submission_date = $5,
      salary = $6,
      source = $7,
      status = $8,
      notes = $9,
      interview_date = $10,
      todos = $11
    WHERE id = $12;
  `

  const values = [
    formData.company,
    formData.role,
    formData.area,
    formData.posted_date,
    formData.submission_date,
    formData.salary,
    formData.source,
    formData.status,
    formData.notes || null,
    formData.interview_date || null,
    JSON.stringify(formData.todos),
    formData.id,
  ]

  await pool.query(query, values)
  io.emit("job_edited") // Emit event after successful editing job
  res.status(200).json({
    message: `Job with ID ${formData.id} updated successfully`,
  })
})

// Update the todos in db with new todos data
jobsRouter.put("/edit-todos", async (req, res) => {
  const formData = req.body
  console.log("Todos updated data received to backend", formData)

  await pool.query("UPDATE jobs_2 SET todos = $2 WHERE id = $1 RETURNING *;", [
    formData.id,
    JSON.stringify(formData.todos),
  ])
  io.emit("todos_edited")
  res.status(200).json({
    message: `Todos with ID ${formData.id} updated successfully`,
  })
})

export default jobsRouter
