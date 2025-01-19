import { twMerge } from "tailwind-merge"

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge("flex items-center rounded-md text-black bg-gray-400", className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
