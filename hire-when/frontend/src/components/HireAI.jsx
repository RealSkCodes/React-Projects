import SearchBar from "./SearchBar.jsx"
import { useState } from "react"

const HireAI = () => {
  const [text, setText] = useState("")
  const [messages, setMessages] = useState({
    user: [
      { id: 1, text: "Bro whats up" },
      { id: 2, text: "How are you doing?" },
      { id: 3, text: "What can you do for me?" },
    ],
    bot: [
      { id: 1, text: "Hello, I'm a bot." },
      { id: 2, text: "I'm here to assist you." },
      { id: 3, text: "I can help with various tasks!" },
    ],
  })

  // Combine and sort messages by ID
  const combinedMessages = [
    ...messages.user.map((msg) => ({ ...msg, type: "user" })),
    ...messages.bot.map((msg) => ({ ...msg, type: "bot" })),
  ].sort((a, b) => a.id - b.id)
  // Handle adding new user messages
  const handleClick = async () => {
    if (!text.trim()) return
    setMessages((prevMessages) => ({
      ...prevMessages,
      user: [...prevMessages.user, { id: prevMessages.user.length + 1, text: text }],
    }))
    const data = await fetch(`http://localhost:3000/hireai-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: text }),
    })
    const json = await data.json()
    console.log(json)
    setMessages((prevMessages) => ({
      ...prevMessages,
      bot: [...prevMessages.bot, { id: prevMessages.bot.length + 1, text: json }],
    }))
    setText("")
  }

  return (
    <div className="w-full h-screen flex flex-col pb-28 bg-background_2">
      <h1 className="font-bold text-2xl text-gray-200 my-6 ml-6">HireAI</h1>

      {/* Main Content Section */}
      <div className="flex flex-col grow justify-between mx-6 bg-gray-700 rounded-lg overflow-hidden shadow-lg">
        <div className="p-4 flex flex-col gap-4 overflow-y-auto">
          {combinedMessages.map((message) => (
            <div
              key={`${message.type}-${message.id}`}
              className={`p-4 max-w-[75%] rounded-lg text-sm font-medium shadow-md 
                ${
                  message.type === "user"
                    ? "bg-blue-500 text-white self-end text-right"
                    : "bg-gray-600 text-gray-100 self-start text-left"
                }
              `}
            >
              {message.text}
            </div>
          ))}
        </div>
        <SearchBar
          containerStyle="p-3 bg-gray-700 rounded-lg shadow-lg"
          inpStyle="w-full h-16 rounded-lg py-2 pt-1 text-gray-200 bg-gray-800 placeholder-gray-400 overflow-hidden border-none"
          inpPlaceholder="Ask something..."
          btnName="Send"
          btnStyle="ml-4 px-6 py-2 rounded-lg text-gray-200 bg-blue-500 hover:bg-blue-600 border-none"
          onInpChange={(e) => setText(e.target.value)}
          inpValue={text}
          onBtnClick={handleClick}
        />
      </div>
    </div>
  )
}

export default HireAI
