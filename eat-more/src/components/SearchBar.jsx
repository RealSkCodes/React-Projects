import Button from "./Button"

const SearchBar = ({ onInputChange, inputValue, buttonName, onButtonClick }) => {
  return (
    <div className="flex items-center">
      <input
        type="text"
        className="bg-white text-black rounded-xl outline-none px-2 mx-3 focus:border-gray-500 border-2"
        onChange={onInputChange}
        value={inputValue}
      />
      <Button name={buttonName} onclick={onButtonClick} />
    </div>
  )
}

export default SearchBar
