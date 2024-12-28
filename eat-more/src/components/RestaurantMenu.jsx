import { useParams } from "react-router"
import { useState, useEffect, useContext } from "react"
import { SWIGGY_IMAGE_API, SWIGGY_REST_DATA_API } from "../constants.js"
import useFetchedData from "../utils/useFetchedData.js"
import Card from "./Card.jsx"
import Button from "./Button.jsx"
import { CartContext } from "../utils/useCartContext.js"

const RestaurantMenu = () => {
  const { cart, setCart } = useContext(CartContext)

  const { restId } = useParams()
  const [restaurantData, setRestaurantData] = useState({})
  const [dishes, setDishes] = useState([])

  const rawData = useFetchedData(SWIGGY_REST_DATA_API + restId)

  useEffect(() => {
    if (rawData?.data) {
      setRestaurantData(rawData.data.cards[2]?.card?.card?.info)
      setDishes(
        rawData.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards
      )
    }
  }, [rawData])

  // Add dish into cart upon click
  const filterAddDish = (dish) => {
    const existingDish = cart.find((item) => item.name === dish?.card?.info?.name)
    if (existingDish) {
      // If dish exists, update the quantity
      setCart(
        cart.map((item) =>
          item.name === dish?.card?.info?.name ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      // If the dish doesn't exist, add it to the cart array
      setCart([
        ...cart,
        {
          id: dish?.card?.info?.id,
          name: dish?.card?.info?.name,
          quantity: 1,
          perPrice: dish?.card?.info?.price
            ? dish?.card?.info?.price / 100
            : dish?.card?.info?.defaultPrice / 100,
        },
      ])
    }
  }

  return (
    <>
      <div className="p-3 flex w-4/5 bg-gray-700 rounded-lg shadow-lg mx-auto">
        <img
          id="rest-image"
          src={SWIGGY_IMAGE_API + restaurantData?.cloudinaryImageId}
          alt={restaurantData?.name}
          className="w-72"
        />
        <div className="p-4">
          <h1 className="text-yellow-400 font-extrabold text-2xl mb-2">
            Restaurant Name: <span className="text-white">{restaurantData?.name}</span>
          </h1>
          <h2 className="text-blue-300 font-medium text-lg mb-4">
            {restaurantData?.locality}, {restaurantData?.city}
          </h2>
          <div className="text-white font-medium text-lg flex flex-wrap items-center mb-4">
            <span className="text-pink-500 font-bold mr-2">Cuisines:</span>
            {restaurantData?.cuisines?.map((cuisine, index) => (
              <span
                key={index}
                className="text-blue-400 bg-blue-900 px-2 py-1 rounded-md text-sm font-semibold mx-1"
              >
                {cuisine + (index === restaurantData.cuisines.length - 1 ? "" : ",")}
              </span>
            ))}
          </div>
          <h3 className="text-orange-400 font-semibold text-lg">
            Ratings: <span className="text-white">{restaurantData?.avgRating} / 5</span>
          </h3>
        </div>
      </div>
      <div className="w-4/5 mx-auto">
        <h1 className="text-white font-bold text-2xl my-2">Menu</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {dishes.map((dish) => {
            return (
              <Card
                key={dish?.card?.info?.id}
                name={dish?.card?.info?.name}
                imgSoruce={SWIGGY_IMAGE_API + dish?.card?.info?.imageId}
                price={
                  dish?.card?.info?.price
                    ? dish?.card?.info?.price / 100
                    : dish?.card?.info?.defaultPrice / 100
                }
              >
                <Button
                  addStyle="w-max text-white bg-sky-500 hover:bg-blue-500 rounded-lg m-2 px-4 py-2 shadow-md"
                  name="Add to Cart"
                  onclick={() => filterAddDish(dish)}
                />
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default RestaurantMenu
