const Button = ({ onclick, name = "Button", addStyle = "", children = "" }) => {
  return (
    <button
      className={`flex items-center rounded-md m-2 px-2 text-black ${addStyle}`}
      onClick={onclick}
    >
      {children}
      {name}
    </button>
  )
}

export default Button
