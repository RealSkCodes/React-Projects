// api/swiggyRestDataApi.js
export default async (req, res) => {
  const { restId } = req.query // Get restaurant ID from query params
  const apiUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&lat=22.7247556&lng=88.4789351&restaurantId=${restId}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" })
  }
}
