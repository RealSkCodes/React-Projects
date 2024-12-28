const Button = ({ onclick, name = "Button", addStyle = "" }) => {
  return (
    <button
      className={`text-black bg-pink-200 rounded-md m-2 px-2 active:bg-pink-300 ${addStyle}`}
      onClick={onclick}
    >
      {name}
    </button>
  )
}

export default Button
