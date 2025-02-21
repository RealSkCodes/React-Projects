import SearchBar from "./SearchBar.jsx"
import { useState, useRef, useEffect } from "react"

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
    try {
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
      if (json.status === 429) {
        setMessages((prevMessages) => ({
          ...prevMessages,
          bot: [...prevMessages.bot, { id: prevMessages.bot.length + 1, text: json.error }],
        }))
      } else {
        setMessages((prevMessages) => ({
          ...prevMessages,
          bot: [...prevMessages.bot, { id: prevMessages.bot.length + 1, text: json.answer }],
        }))
      }
      setText("")
    } catch (err) {
      console.log("Error: " + err)
    }
  }

  // Scroll HireAI chats logic
  const messagesEndRef = useRef(null)
  const aiSidebarRef = useRef(null)
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [messages])

  return (
    <div className="w-full h-screen flex flex-col pb-10 bg-background_2 overflow-y-auto">
      <h1 className="font-bold text-2xl text-gray-200 my-6 ml-6">HireAI</h1>

      {/* Main Content Section */}
      <div className="flex flex-col grow justify-between mx-6  bg-gradient-to-b from-background_3 to-background_2 border border-border rounded-lg overflow-hidden shadow-lg">
        <div ref={aiSidebarRef} className="p-4 flex flex-col gap-4 overflow-y-auto">
          {combinedMessages.map((message) => (
            <div
              key={`${message.type}-${message.id}`}
              id={message.id}
              className={`p-4 max-w-[75%] rounded-lg text-sm font-medium shadow-md 
                ${
                  message.type === "user"
                    ? "bg-secondary text-white self-end text-right"
                    : "bg-primary text-gray-100 self-start text-left"
                }
              `}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <SearchBar
          containerStyle="p-2 bg-background_2 border-t border-border rounded-lg shadow-lg"
          inpStyle="w-full h-16 rounded-lg pt-1 text-gray-200 bg-gray-800 placeholder-gray-400 overflow-hidden border border-border"
          inpPlaceholder="Ask something..."
          btnName="Send"
          btnStyle="px-3 py-2 rounded-lg text-gray-200 bg-primary hover:bg-blue-600 border-none"
          onInpChange={(e) => setText(e.target.value)}
          inpValue={text}
          onBtnClick={handleClick}
        />
      </div>
    </div>
  )
}

export default HireAI
