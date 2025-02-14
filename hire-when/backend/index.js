import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
// Routers import
import jobsRouter from "./routes/jobs.routes.js"
import hireaiRouter from "./routes/hireai.routes.js"

const app = express()
app.use(express.static("public"))
app.use(express.json())
app.use(cors())

// Routers usage
app.use("/", jobsRouter)
app.use("/", hireaiRouter)

// Websocket setup
const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)
})

server.listen(process.env.PORT, () => {
  console.log(`App running on Port: ${process.env.PORT}`)
})
