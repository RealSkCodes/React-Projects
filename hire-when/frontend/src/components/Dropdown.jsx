const Dropdown = ({
  itemsArray = [],
  mainBgStyle = "",
  title = "",
  titleStyle = "",
  dropStyle = "",
}) => {
  return (
    <div className={`flex flex-col ${mainBgStyle}`}>
      <span className={`mx-2 mb-1 font-semibold ${titleStyle}`}>{title}</span>
      <select
        className={`bg-transparent outline-none border-black border-2 rounded-md mx-2 my-1 px-2 ${dropStyle}`}
      >
        {itemsArray.map((item) => (
          <option key={item} className="bg-[#f5f4fa]" value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
