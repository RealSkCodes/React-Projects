import React from "react"

const Section = ({ title, content, centerTitle = false }) => {
  return (
    <div className="section mb-8">
      {title && (
        <h2
          className={`text-[#FF6347] text-2xl font-bold mb-4 ${
            centerTitle ? "text-center" : "text-left"
          }`}
        >
          {title}
        </h2>
      )}
      {content && (
        <p className="text-green-950 text-lg font-medium leading-relaxed text-justify">{content}</p>
      )}
    </div>
  )
}

export default Section
