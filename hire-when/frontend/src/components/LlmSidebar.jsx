import React from "react"

const LlmSidebar = () => {
  return (
    <div className="border-gray-300 border-l-[1px] w-1/3 p-3 flex flex-col bg-[#edebf7]">
      <span className="m-2 p-1 border-darkPlum border-2 rounded-xl w-max self-start bg-green-400">
        Hello there my user its my honor to server you
      </span>
      <span className="m-2 p-1 border-darkPlum border-2 rounded-xl w-max self-end bg-softPurple">
        Yes can you summarize my last applied job
      </span>
    </div>
  )
}

export default LlmSidebar
