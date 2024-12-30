import Button from "./Button"
import { useContext } from "react"
import { CartContext } from "../utils/useCartContext"

const Cart = () => {
  const { cart, setCart } = useContext(CartContext)

  const filterRemoveItem = (itemId) => {
    const filteredList = cart.filter((item) => {
      return itemId != item.id
    })
    setCart(filteredList)
  }

  return (
    <div className="border-2 border-gray-300 rounded-xl bg-white shadow-lg p-4 w-[650px] mx-auto">
      <h1 className="text-gray-900 font-extrabold text-2xl text-center mb-4">
        Items in Cart - {cart.reduce((preValue, curValue) => preValue + curValue.quantity, 0)}
      </h1>
      <div className="text-gray-800">
        {cart.map((item) => {
          return (
            <div
              key={item.id}
              className="grid grid-cols-8 border border-gray-300 rounded-xl p-3 my-3 hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <div className="col-span-5 flex flex-col">
                <span className="text-lg font-bold">{item.name}</span>
                <span className="font-medium text-sm">
                  <span className="bg-blue-200 rounded-xl px-2">Quantity: {item.quantity}</span>{" "}
                  {""}
                  <span className="bg-gray-200 rounded-xl px-2">
                    {" "}
                    Per Item Cost: ₹{item.perPrice}
                  </span>
                </span>
              </div>
              <h1 className="col-span-2 my-auto">Total Price: ₹ {item.quantity * item.perPrice}</h1>
              <Button
                name="X"
                addStyle="my-auto bg-red-300 text-red-900 rounded-3xl font-bold col-span-1 h-8 w-9"
                onclick={() => filterRemoveItem(item.id)}
              />
            </div>
          )
        })}
      </div>
      <h1 className="text-gray-900 font-bold text-xl text-center mt-4">
        Total Cost: ₹ {""}
        <span className="text-green-600">
          {cart.reduce((preValue, curValue) => preValue + curValue.quantity * curValue.perPrice, 0)}
        </span>
      </h1>
      <div className="flex justify-center">
        <Button
          name="Proceed to checkout"
          addStyle="bg-yellow-500 text-gray-900 font-bold px-4 py-1 rounded-2xl"
          onclick={() => alert("We will deliver Soon! (just kidding)")}
        />
      </div>
    </div>
  )
}

export default Cart
