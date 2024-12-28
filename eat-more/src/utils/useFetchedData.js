import { useState, useEffect } from "react"

const useFetchedData = (apiLink) => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const data = await fetch(apiLink)
    const json = await data.json()
    setData(json)
    console.count("Api called")
  }

  useEffect(() => {
    fetchData()
  }, [])

  return data
}
export default useFetchedData
