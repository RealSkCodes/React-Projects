const SearchBar = ({
  containerStyle = "",
  inpPlaceholder = "🔍 Search....",
  inpValue,
  onInpChange,
  inpStyle = "",
  onBtnClick,
  btnStyle = "",
  btnName = "Button",
}) => {
  return (
    <div className={`flex items-center ${containerStyle}`}>
      <textarea
        type="text"
        placeholder={inpPlaceholder}
        value={inpValue}
        onChange={onInpChange}
        className={`h-9 px-2 m-2 bg-transparent border-2 border-black rounded-md resize-none outline-none ${inpStyle}`}
      />
      <button
        onClick={onBtnClick}
        className={`px-2 my-2 border-2 border-black rounded-md ${btnStyle}`}
      >
        {btnName}
      </button>
    </div>
  )
}

export default SearchBar
