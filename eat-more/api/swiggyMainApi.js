export default async function handler(req, res) {
  const apiUrl =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.57400&lng=88.31910&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
      },
    })

    if (!response.ok) {
      throw new Error(`Swiggy API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error("Error fetching Swiggy API:", error.message)
    res.status(500).json({ error: "Failed to fetch data" })
  }
}
