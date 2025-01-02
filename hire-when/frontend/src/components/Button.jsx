const Button = ({ onclick, name = "Button", addStyle = "" }) => {
  return (
    <button className={`text-black rounded-md m-2 px-2 ${addStyle}`} onClick={onclick}>
      {name}
    </button>
  )
}

export default Button
