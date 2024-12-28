import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const SWIGGY_MAIN_API =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.57400&lng=88.31910&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
const SWIGGY_REST_DATA_API =
  "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&lat=22.7247556&lng=88.4789351&restaurantId="

const app = express()
const port = process.env.PORT || 3000

app.use(cors()) // Enable CORS for all origins (for dev)

// Simple root route
app.get("/", (req, res) => res.send("Server is up and running"))

// Route to proxy Swiggy main API
app.get("/api/swiggy", async (req, res) => {
  try {
    const response = await fetch(SWIGGY_MAIN_API, {
      headers: { "User-Agent": "Mozilla/5.0" },
    })
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch from Swiggy: ${response.status} ${response.statusText}`,
      })
    }
    res.json(await response.json())
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Route to proxy restaurant-specific data
app.get("/api/swiggy/restaurant", async (req, res) => {
  const { restaurantId } = req.query
  if (!restaurantId) return res.status(400).json({ error: "restaurantId is required" })

  try {
    const response = await fetch(`${SWIGGY_REST_DATA_API}${restaurantId}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    })
    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch from Swiggy: ${response.status} ${response.statusText}`,
      })
    }
    res.json(await response.json())
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
