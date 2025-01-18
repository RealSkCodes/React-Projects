import { useState, useEffect } from "react"

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
    <div className={`flex flex-col ${mainBgStyle}`}>
      <span className={`mx-2 mb-1 text-base font-semibold ${titleStyle}`}>{title}</span>
      <select
        className={`rounded-md mx-2 my-1 px-2 border-2 ${
          localInvalid ? "border-red-500" : "border-black"
        } bg-transparent outline-none ${dropStyle}`}
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="" disabled className="bg-background">
          Select an option
        </option>
        {itemsArray.map((item) => (
          <option key={item} className="bg-background" value={item}>
            {item}
          </option>
        ))}
      </select>
      {localInvalid && <p className="text-red-500">{errorMessage || "Please select an option."}</p>}
    </div>
  )
}

export default Dropdown
