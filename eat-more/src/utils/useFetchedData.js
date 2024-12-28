import { useState, useEffect } from "react"

const useFetchedData = (apiLink) => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch(apiLink, {
        method: "GET", // Using GET directly
        headers: {
          "Content-Type": "application/json",
          Origin: "https://eat-more-rouge.vercel.app", // Adjust the origin as needed
          "X-Requested-With": "XMLHttpRequest",
        },
      })

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const json = await response.json()
      setData(json)
      console.count("API called")
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [apiLink])

  return data
}

export default useFetchedData
