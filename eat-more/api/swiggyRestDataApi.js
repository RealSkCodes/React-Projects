export default async (req, res) => {
  const { restId } = req.query // Get restaurant ID from query params
  const apiUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&lat=22.7247556&lng=88.4789351&restaurantId=${restId}`

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
    })
    const data = await response.json()

    // Set CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    res.status(200).json(data) // Send back the fetched data
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" }) // Handle errors
  }
}
