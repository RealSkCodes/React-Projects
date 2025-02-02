import { useState, useEffect } from "react"
import { twMerge } from "tailwind-merge"

const Dropdown = ({
  itemsArray = [],
  mainBgStyle = "",
  title = "",
  titleStyle = "",
  dropStyle = "",
  selectedValue = "",
  onSelectChange = () => {},
  errorMessage = "",
  isInvalid = false,
  placeholder = "Select an option",
}) => {
  const [localInvalid, setLocalInvalid] = useState(false)

  useEffect(() => {
    setLocalInvalid(isInvalid)
  }, [isInvalid])

  const handleChange = (e) => {
    setLocalInvalid(false)
    onSelectChange(e.target.value)
  }

  return (
    <div className={twMerge("flex flex-col", mainBgStyle)}>
      <span className={twMerge("mx-2 mb-1 text-base font-semibold", titleStyle)}>{title}</span>
      <select
        className={twMerge(
          "rounded-md mx-2 my-1 px-2 border-2 bg-transparent outline-none",
          localInvalid ? "border-red-500" : "border-black",
          dropStyle
        )}
        value={selectedValue}
        onChange={handleChange}
      >
        {selectedValue === "" && (
          <option value="" disabled className={twMerge("bg-background")}>
            {placeholder}
          </option>
        )}
        {itemsArray.map((item) => {
          const truncatedText =
            item.element.length > 50 ? item.element.substring(0, 47) + "..." : item.element

          return (
            <option key={item.id} className={twMerge("bg-background")} value={item.element}>
              {truncatedText}
            </option>
          )
        })}
      </select>
      {localInvalid && (
        <p className={twMerge("text-red-500")}>{errorMessage || "Please select an option."}</p>
      )}
    </div>
  )
}

export default Dropdown
