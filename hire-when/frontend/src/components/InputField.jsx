import { twMerge } from "tailwind-merge"

const InputField = ({
	mainBgStyle = "",
	title = "",
	titleStyle = "",
	inpType = "text",
	inpPlaceholder = "Type here....",
	inpValue,
	onInpChange,
	inpStyle = "",
	isRequired = false,
	min = "",
	max = "",
	autofocus = false,
	autoComplete = "off",
	name = "",
}) => {
	// Opens the date picker on click
	const handleClick = (e) => {
		if (inpType === "date") {
			e.target.showPicker()
		}
	}

	return (
		<div className={twMerge("flex flex-col w-min", mainBgStyle)}>
			<span className={twMerge("mx-2 mb-1 font-semibold", titleStyle)}>
				{title}
			</span>
			<input
				name={name}
				autoComplete={autoComplete}
				autoFocus={autofocus}
				type={inpType}
				placeholder={inpPlaceholder}
				value={inpValue}
				onChange={onInpChange}
				className={twMerge(
					"rounded-md mx-2 my-1 px-2 bg-transparent outline-none",
					inpStyle
				)}
				required={isRequired}
				minLength={min}
				maxLength={max}
				onClick={handleClick}
			/>
		</div>
	)
}

export default InputField
