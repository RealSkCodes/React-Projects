import { useEffect, useState, useMemo } from "react"
import { Link } from "react-router"
import SearchBar from "./SearchBar"
import Card from "./Card"
import useFetchedData from "../utils/useFetchedData.js"
import { SWIGGY_MAIN_API, SWIGGY_IMAGE_API } from "../constants.js"

const Body = () => {
  // Initial state for filtered Restaurant list and the text User will Search
  const [filteredList, setFilteredList] = useState([])
  const [searchText, setSearchText] = useState("")

  // Calling the api
  const rawData = useFetchedData(SWIGGY_MAIN_API)
  const restaurantsList =
    rawData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []

  // Filter the Restaurant list based on Searched text
  const filterRestData = (restList, searchText) => {
    const list = restList.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    )
    setFilteredList(list)
  }
  useEffect(() => {
    setFilteredList(restaurantsList)
  }, [rawData])

  return (
    <div className="flex flex-wrap flex-col w-4/5 mx-auto">
      <h1 className="text-white text-2xl font-bold mx-3">Restaurants</h1>
      <SearchBar
        buttonName={"Search"}
        inputValue={searchText}
        onInputChange={(e) => setSearchText(e.target.value)}
        onButtonClick={() => filterRestData(restaurantsList, searchText)}
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {filteredList.map((restaurant) => (
          <Link to={"/restaurant/" + restaurant?.info?.id} key={restaurant?.info?.id}>
            <Card
              imgSoruce={SWIGGY_IMAGE_API + restaurant?.info?.cloudinaryImageId}
              name={restaurant?.info?.name}
              rating={restaurant?.info?.avgRating}
              area={restaurant?.info?.locality + ", " + restaurant?.info?.areaName}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Body
