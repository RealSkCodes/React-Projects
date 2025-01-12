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
    const result = await pool.query("SELECT * FROM jobs;")
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
  const query = `INSERT INTO jobs (company, role, area, posted_on, submission_date, status, source, salary, notes)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`

  const values = [
    formData.company,
    formData.role,
    formData.area,
    formData.posted_on,
    formData.submission_date,
    formData.status,
    formData.source,
    formData.salary,
    formData.notes,
  ]
  await pool.query(query, values)

  io.emit("job_added") // Emit event after successful insertion
  // Send response back to Frontend client
  res.status(200).json({
    message: "Data received successfully from Frontend",
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
