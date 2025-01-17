const Dropdown = ({
  itemsArray = [],
  mainBgStyle = "",
  title = "",
  titleStyle = "",
  dropStyle = "",
  selectedValue = "",
  onSelectChange = () => {},
}) => {
  return (
    <div className={`flex flex-col ${mainBgStyle}`}>
      <span className={`mx-2 mb-1 text-base font-semibold ${titleStyle}`}>{title}</span>
      <select
        className={`rounded-md mx-2 my-1 px-2 border-2 border-black bg-transparent outline-none ${dropStyle}`}
        value={selectedValue}
        onChange={(e) => onSelectChange(e.target.value)}
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
    </div>
  )
}

export default Dropdown
