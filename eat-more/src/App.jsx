import { StrictMode, useState } from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import Header from "./components/Header.jsx"
import Body from "./components/Body.jsx"
import Features from "./components/Features.jsx"
import Cart from "./components/Cart.jsx"
import Github from "./components/Github.jsx"
import RestaurantMenu from "./components/RestaurantMenu.jsx"
import { CartContext } from "./utils/useCartContext.js"

const App = () => {
  const [cart, setCart] = useState([])
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Header />
      <Outlet />
    </CartContext.Provider>
  )
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "features",
        element: <Features />,
      },
      { path: "github", element: <Github /> },
      { path: "cart", element: <Cart /> },
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/restaurant/:restId",
        element: <RestaurantMenu />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={appRouter} />{" "}
  </>
)
