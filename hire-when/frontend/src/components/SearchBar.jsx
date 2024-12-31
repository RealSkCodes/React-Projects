const SearchBar = ({
  inpPlaceholder = "🔍 Search....",
  inpValue,
  onInpChange,
  inpStyle = "",
  onBtnClick,
  btnStyle = "",
  btnName = "Button",
}) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder={inpPlaceholder}
        value={inpValue}
        onChange={onInpChange}
        className={`bg-transparent outline-none border-black border-2 rounded-md m-2 px-2 ${inpStyle}`}
      />
      <button
        onClick={onBtnClick}
        className={`border-black border-2 rounded-md my-2 px-2 ${btnStyle}`}
      >
        {btnName}
      </button>
    </div>
  )
}

export default SearchBar
