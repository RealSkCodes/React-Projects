import SearchBar from "./SearchBar.jsx"

const HireAI = () => {
  const messages = {
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
  }

  // Combine and sort messages by ID
  const combinedMessages = [
    ...messages.user.map((msg) => ({ ...msg, type: "user" })),
    ...messages.bot.map((msg) => ({ ...msg, type: "bot" })),
  ].sort((a, b) => a.id - b.id)

  return (
    <div className="w-full h-screen flex flex-col pb-28">
      {/* Navigation Section */}
      <div className="flex justify-start m-3">
        <span className="mx-2 px-4 py-1 bg-secondary text-gray-100 font-semibold rounded-2xl cursor-pointer hover:bg-primary">
          Job Details AI
        </span>
        <span className="mx-2 px-4 py-1 bg-secondary text-gray-100 font-semibold rounded-2xl cursor-pointer hover:bg-primary">
          Text Gen AI
        </span>
      </div>

      {/* Main Content Section */}
      <div className="border-text border-2 rounded-lg mx-5 flex flex-col justify-between grow overflow-y-auto">
        <div className="p-3 flex flex-col gap-2">
          {combinedMessages.map((message) => (
            <div
              key={`${message.type}-${message.id}`}
              className={`p-2 max-w-[70%] rounded ${
                message.type === "user"
                  ? "bg-blue-100 self-end text-right"
                  : "bg-green-100 self-start text-left"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <SearchBar
          containerStyle="p-3"
          inpStyle="w-full h-16 border-[1px] py-1"
          inpPlaceholder="Enter your prompts here..."
          btnName="Enter"
          btnStyle="bg-primary border-none px-4 py-2 text-gray-100"
        />
      </div>
    </div>
  )
}

export default HireAI
