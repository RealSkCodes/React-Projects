import express from "express"
import "dotenv/config"
import pool from "./config/db.config.js"

const app = express()

app.use(express.static("public"))

app.get("/", (req, res) => {
  res.send("Express server working")
  console.log("Express server working")
})

app.get("/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees;")
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal Server Error")
  }
})

app.listen(process.env.PORT, () => {
  console.log(`App running on Port: ${process.env.PORT}`)
})
