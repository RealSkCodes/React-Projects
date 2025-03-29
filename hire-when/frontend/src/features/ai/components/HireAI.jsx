// Core
import { useState, useRef, useEffect } from "react";
// Component
import SearchBar from "../../../shared/components/SearchBar.jsx";

// Main HireAI functional component
const HireAI = () => {
  // TODO: Fix bug (store the jobs in Pinecone for a particular unique user, means add auth for each user job in Pinecone somehow)

  // States
  const [userMessageText, setUserMessageText] = useState("");
  const [messages, setMessages] = useState({
    // TODO: Store the messages into Context API later
    user: [
      { id: 1, text: "Who are you?" },
      { id: 2, text: "What can you do for me?" },
    ],
    bot: [
      { id: 1, text: "Hello, I'm HireAI." },
      { id: 2, text: "I can answer your various job-related questions!" },
    ],
  });

  // Combine, Sort, and Organize user and bot messages by Id
  const combinedMessages = [...messages.user.map((msg) => ({ ...msg, type: "user" })), ...messages.bot.map((msg) => ({ ...msg, type: "bot" }))].sort((a, b) => a.id - b.id);

  // Handle adding new user messages
  const handleClick = async () => {
    try {
      if (!userMessageText.trim()) return; // If input is empty then just return

      const newUserMessage = { id: Date.now(), text: userMessageText };

      // Update messages state with new user message
      setMessages((prevMessages) => ({
        user: [...(prevMessages.user || []), newUserMessage],
        bot: prevMessages.bot || [],
      }));

      // Post the user message/text to backend
      const response = await fetch("http://localhost:3000/hireai-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userMessageText }),
      });

      const json = await response.json();

      // Check for rate limiting error
      const newBotMessage = {
        id: Date.now(),
        text: json.status === 429 ? json.error : json.answer,
      };

      // Update messages state with bot response
      setMessages((prevMessages) => ({
        user: prevMessages.user,
        bot: [...(prevMessages.bot || []), newBotMessage],
      }));
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setUserMessageText(""); // Clear input field after processing
    }
  };

  // Scroll HireAI chats logic
  const messagesEndRef = useRef(null);
  const aiSidebarRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  return (
    <div className="w-full h-screen flex flex-col pb-10 bg-background_2 overflow-y-auto">
      <h1 className="font-bold text-2xl text-gray-200 my-6 ml-6">HireAI</h1>

      {/* Main Content Section */}
      <div className="flex flex-col grow justify-between mx-6 bg-gradient-to-b from-background_3 to-background_2 border border-border rounded-lg overflow-hidden shadow-lg">
        <div ref={aiSidebarRef} className="p-4 flex flex-col gap-4 overflow-y-auto">
          {combinedMessages.map((message) => (
            <div
              key={`${message.type}-${message.id}`}
              className={`p-4 max-w-[75%] rounded-lg text-sm font-medium shadow-md 
                ${message.type === "user" ? "bg-secondary text-white self-end text-right" : "bg-primary text-gray-100 self-start text-left"}
              `}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <SearchBar containerStyle="p-2 bg-background_2 border-t border-border rounded-lg shadow-lg" inpStyle="w-full h-16 rounded-lg pt-1 text-gray-200 bg-gray-800 placeholder-gray-400 overflow-hidden border border-border" inpPlaceholder="Ask something..." btnName="Send" btnStyle="px-3 py-2 rounded-lg text-gray-200 bg-primary hover:bg-blue-600 border-none" onInpChange={(e) => setUserMessageText(e.target.value)} inpValue={userMessageText} onBtnClick={handleClick} />
      </div>
    </div>
  );
};

export default HireAI;
