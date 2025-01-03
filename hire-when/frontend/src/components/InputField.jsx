const InputField = ({
  mainBgStyle = "",
  title = "",
  titleStyle = "",
  inpType = "text",
  inpPlaceholder = "Type here....",
  inpValue,
  onInpChange,
  inpStyle = "",
}) => {
  return (
    <div className={`flex flex-col w-min ${mainBgStyle}`}>
      <span className={`mx-2 mb-1 font-semibold ${titleStyle}`}>{title}</span>
      <input
        type={inpType}
        placeholder={inpPlaceholder}
        value={inpValue}
        onChange={onInpChange}
        className={`bg-transparent outline-none border-black border-2 rounded-md mx-2 my-1 px-2 ${inpStyle}`}
      />
    </div>
  )
}

export default InputField