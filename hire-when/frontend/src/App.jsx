import Header from "./components/Header.jsx"
import Sidebar from "./components/Sidebar.jsx"
import Body from "./components/Body.jsx"
import LlmSidebar from "./components/LlmSidebar.jsx"

function App() {
  return (
    <>
      <Header />
      <div className="flex min-w-max">
        <Sidebar />
        <Body />
        <LlmSidebar />
      </div>
    </>
  )
}

export default App
