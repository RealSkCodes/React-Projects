import express from "express"
import "dotenv/config"
import pool from "./config/db.config.js"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

const app = express()
app.use(express.static("public"))
app.use(express.json())
app.use(cors())

// Websocket setup
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})

app.get("/", (req, res) => {
  res.send("Express server working")
  console.log("Express server working")
})

app.get("/jobs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jobs_2;")
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal Server Error")
  }
})

// Handle the fetched POST data from frontend
app.post("/add-job", async (req, res) => {
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

// Handle editing job data
app.put("/edit-job", async (req, res) => {
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

// Edit the todos in db
app.put("/edit-todos", async (req, res) => {
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

app.post("/hireai-post", async (req, res) => {
  // Extract the user prompt from the request body
  const userPrompt = req.body
  console.log("User Prompt:", userPrompt.user)

  // Function to query the Hugging Face API
  const query = async (data) => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    )
    const result = await response.json()
    return result
  }

  try {
    const apiResponse = await query({
      inputs: {
        question: userPrompt.user,
        context: "My name is realsk, i'm a junior web developer",
      },
    })
    // Log and send the response back to the frontend
    console.log("API Response:", apiResponse)
    res.json(apiResponse)
  } catch (error) {
    console.error("Error querying Hugging Face API:", error)
    res.status(500).json({ error: "An error occurred while querying the API." })
  }
})

// Websocket usage
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)
})

server.listen(process.env.PORT, () => {
  console.log(`App running on Port: ${process.env.PORT}`)
})
