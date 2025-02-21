import { NavLink } from "react-router"
import InputField from "./InputField"
import Button from "./Button"

const Login = () => {
	const handleSubmit = (e) => {
		// e.preventDefault()
		console.log(e)
	}

	return (
		<div className="w-full h-screen flex justify-center items-center bg-background text-text">
			<form className="flex flex-col justify-center items-center border border-border bg-background_3 rounded-lg p-5">
				<h1 className="text-3xl font-bold">Log Into</h1>
				<h2 className="text-lg font-extralight mb-5">your account</h2>
				<div className="flex items-center border border-blue-300 px-3 my-2 rounded-md">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-5 h-5 text-gray-500"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						strokeWidth="1.5"
						stroke="currentColor"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<rect x="3" y="5" width="18" height="14" rx="2" />
						<polyline points="3 7 12 13 21 7" />
					</svg>
					<InputField
						name="email"
						autoComplete="email"
						inpType="email"
						titleStyle="m-0"
						mainBgStyle="my-2"
						inpPlaceholder="Email"
						inpStyle="min-w-[200] md:min-w-[270px] mx-0 my-0 autofill-text-input"
						isRequired={true}
					/>
				</div>
				<div className="flex items-center border border-blue-300 px-3 my-2 rounded-md">
					<svg
						xmlns="http://www.w2000/svg"
						className="w-5 h-5 text-gray-500"
						viewBox="0 0 24 24"
						width="24"
						height="24"
						strokeWidth="1.5"
						stroke="currentColor"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<rect x="5" y="11" width="14" height="10" rx="2" />
						<circle cx="12" cy="16" r="1" />
						<path d="M8 11v-4a4 4 0 0 1 8 0v4" />
					</svg>
					<InputField
						name="password"
						autoComplete="current-password"
						inpType="password"
						titleStyle="m-0"
						mainBgStyle="my-2"
						inpPlaceholder="Password"
						inpStyle="min-w-[200] md:min-w-[270px] mx-0 my-0 autofill-text-input"
						isRequired={true}
					/>
				</div>
				<Button
					type="submit"
					onClick={handleSubmit}
					className="px-4 py-2 my-2 bg-gradient-to-br from-primary to-secondary text-text active:from-secondary active:to-primary"
				>
					Log In
				</Button>
				<NavLink className="mt-2 underline" to="/signup">
					<span className="text-sm font-normal">
						Don't have an account? Register
					</span>
				</NavLink>
			</form>
		</div>
	)
}
export default Login
