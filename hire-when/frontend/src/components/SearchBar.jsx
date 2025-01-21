import Button from "./Button"
import { twMerge } from "tailwind-merge"

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
    <div className={twMerge("flex items-center", containerStyle)}>
      <textarea
        type="text"
        placeholder={inpPlaceholder}
        value={inpValue}
        onChange={onInpChange}
        className={twMerge(
          "h-9 px-2 m-2 bg-transparent border-2 border-black rounded-md resize-none outline-none",
          inpStyle
        )}
      />
      <Button
        onClick={onBtnClick}
        className={twMerge("px-2 my-2 border-2 border-black rounded-md", btnStyle)}
      >
        {btnName}
      </Button>
    </div>
  )
}

export default SearchBar
